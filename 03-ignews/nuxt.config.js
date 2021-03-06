export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: '03-ignews',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['./assets/styles/global.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'nuxt-typed-vuex',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/dotenv',
		'@nuxtjs/auth-next',
		['cookie-universal-nuxt', { alias: 'cookiz' }],
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: '/api',
		withCredentials: true,
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	publicRuntimeConfig: {
		stripeSuccessUrl: process.env.STRIPE_SUCCESS_URL,
		stripeCancelUrl: process.env.STRIPE_CANCEL_URL,
	},

	serverMiddleware: [{ path: '/api', handler: '~/server-middleware/index.ts' }],

	auth: {
		redirect: {
			callback: '/api/auth/callback',
			home: '/',
			logout: '/',
		},
		watchLoggedIn: true,
		strategies: {
			github: {
				scheme: '~/schemes/Oauth2CookieScheme',
				clientId: process.env.GITHUB_ID,
				clientSecret: process.env.GITHUB_SECRET,
				scope: 'read:user',
				redirectUri: process.env.GITHUB_CALLBACK_URL,
			},
		},
	},
};
