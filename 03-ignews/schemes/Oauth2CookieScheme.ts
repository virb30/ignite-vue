import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime';
import jwt from 'jsonwebtoken';
import { fauna } from '../services/fauna';
import { query as q } from 'faunadb';

type User = Record<'name' | 'email' | 'avatar_url', string>;

export default class Oauth2CookieScheme extends Oauth2Scheme {
	async getUserActiveSubscription (user: User) {
		try {
			const userActiveSubscription = await fauna.query(
				q.Get(
					q.Intersection([
						q.Match(
							q.Index('subscription_by_user_ref'),
							q.Select(
								'ref',
								q.Get(
									q.Match(
										q.Index('user_by_email'),
										q.Casefold(user.email),
									),
								),
							),
						),
						q.Match(
							q.Index('subscription_by_status'),
							'active',
						),
					]),
				),
			);

			return userActiveSubscription;
		} catch {
			return null;
		}
	}

	async setSession () {
		await super.fetchUser();
		const user = this.$auth.user as Record<
		'name' | 'email' | 'avatar_url',
		string
		>;

		const activeSubscription = await this.getUserActiveSubscription(user);

		const session = {
			user: {
				email: user.email,
				name: user.name,
				image: user.avatar_url,
				activeSubscription,
			},
		};

		const sessionJWT = jwt.sign(session, process.env.SECRET_KEY || '');

		this.$auth.$storage.setUniversal('_session', sessionJWT);
		this.$auth.$storage.setState('session', session);
	}

	async fetchUser () {
		await this.setSession();
	}

	logout () {
		this.$auth.$storage.removeUniversal('_session');
		super.logout();
	}
}
