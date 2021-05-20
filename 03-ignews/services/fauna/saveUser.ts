import { query as q } from 'faunadb'
import { fauna } from './index'

export async function saveUser(user: any) {
  const { email } = user

  try {
    await fauna.query(
      q.If(
        q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))),
        q.Create(q.Collection('users'), { data: { email } }),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
      )
    )

    return true
  } catch {
    return false
  }
}
