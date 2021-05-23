import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime'
import jwt from 'jsonwebtoken'

export default class Oauth2CookieScheme extends Oauth2Scheme {
  async fetchUser() {
    await super.fetchUser()

    const user = this.$auth.user as Record<
      'name' | 'email' | 'avatar_url',
      string
    >

    const session = {
      user: {
        email: user.email,
        name: user.name,
        image: user.avatar_url,
      },
    }

    const sessionJWT = jwt.sign(session, process.env.SECRET_KEY || '')

    this.$auth.$storage.setUniversal(`_session`, sessionJWT)
  }

  logout() {
    this.$auth.$storage.removeUniversal('_session')
    super.logout()
  }
}
