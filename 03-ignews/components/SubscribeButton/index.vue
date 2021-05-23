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
import Vue from 'vue'
import { getStripeJs } from '~/services/stripe-js'

interface SubscribeButtonProps {
  priceId: string
}

interface Methods {
  handleSubscribe: () => Promise<void>
}

export default Vue.extend<unknown, Methods, unknown, SubscribeButtonProps>({
  props: {
    priceId: {
      type: String,
      default: '',
    },
  },
  methods: {
    async handleSubscribe() {
      if (!this.$auth.loggedIn) {
        this.$auth.loginWith('github')
        return
      }

      try {
        const response = await this.$axios.post('/subscribe')
        const { sessionId } = response.data
        const stripe = await getStripeJs()

        await stripe?.redirectToCheckout({ sessionId })
      } catch (err) {
        alert(err.message)
      }
    },
  },
})
</script>

<style module lang="scss" src="./styles.module.scss"></style>
