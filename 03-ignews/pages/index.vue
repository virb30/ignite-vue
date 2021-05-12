<template>
  <div>
    <main :class="$style.contentContainer">
      <section :class="$style.hero">
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {{ product.amount }} month</span>
        </p>

        <SubscribeButton :price-id="'1'" />
      </section>

      <img src="@/assets/images/avatar.svg" alt="Girl coding" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SubscribeButton from '@/components/SubscribeButton/index.vue'
import { stripe } from '@/services/stripe'

interface Data {
  product: {
    priceId: string
    amount: string
  }
}

export default Vue.extend<Data, unknown, unknown, []>({
  components: {
    SubscribeButton,
  },
  data() {
    return {
      product: {
        priceId: '',
        amount: '',
      },
    }
  },
  async fetch() {
    const price = await stripe.prices.retrieve('price_1IpIG0FjKdkGJCFXXSBFWBIX')

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(price.unit_amount) / 100),
    }

    this.product = product
  },
  head: {
    title: 'Home | ig.news',
  },
  fetchOnServer: true,
})
</script>

<style module src="./home.module.scss" lang="scss" scoped></style>
