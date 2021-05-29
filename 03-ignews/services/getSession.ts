import jwt from 'jsonwebtoken';

interface Session {
	user: {
		email: string;
		name: string;
		image: string;
		activeSubscription: object | null
	}
}

export function getSession (session:string): Session {
	return jwt.verify(session, process.env.SECRET_KEY || '') as Session;
}
