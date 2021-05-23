import { NextFunction, Request, Response } from 'express'
import { query as q } from 'faunadb'
import jwt from 'jsonwebtoken'
import { fauna } from '../services/fauna'
import { stripe } from '../services/stripe'

type Session = {
  user: {
    email: string
  }
}

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST') {
    const sessionJWT = req.cookies['auth._session']

    const session = jwt.verify(
      sessionJWT,
      process.env.SECRET_KEY || ''
    ) as Session

    const authUser = session.user

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(authUser.email)))
    )

    let customerId = user.data.stripe_customer_id

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: authUser.email,
      })

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      )

      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1IpIG0FjKdkGJCFXXSBFWBIX', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL || '',
      cancel_url: process.env.STRIPE_CANCEL_URL || '',
    })

    return res.end(JSON.stringify({ sessionId: stripeCheckoutSession.id }))
  } else {
    res.writeHead(405, { Allow: 'POST' }).end('Method not allowed')
  }
}
