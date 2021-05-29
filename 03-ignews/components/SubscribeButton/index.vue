<template>
	<button
		type="button"
		:class="$style.subscribeButton"
		@click="handleSubscribe"
	>
		Subscribe now
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { getStripeJs } from '~/services/stripe-js';
import { getSession } from '~/services/getSession';

interface SubscribeButtonProps {
	priceId: string
}

interface Session {
	user: {
		activeSubscription: object | null
	}
}

interface Computed {
	session: Session | null;
}

interface Methods {
	handleSubscribe: () => Promise<void>
}

export default Vue.extend<unknown, Methods, Computed, SubscribeButtonProps>({
	props: {
		priceId: {
			type: String,
			default: '',
		},
	},
	computed: {
		session () {
			return getSession(this.$auth.$storage.getUniversal('_session') as string);
		},
	},
	methods: {
		async handleSubscribe () {
			if (!this.$auth.loggedIn) {
				this.$auth.loginWith('github');
				return;
			}

			if (this.session?.user.activeSubscription) {
				this.$router.push('/posts');
				return;
			}

			try {
				const response = await this.$axios.post('/subscribe');
				const { sessionId } = response.data;
				const stripe = await getStripeJs();

				await stripe?.redirectToCheckout({ sessionId });
			} catch (err) {
				alert(err.message);
			}
		},
	},
});
</script>

<style module lang="scss" src="./styles.module.scss"></style>
