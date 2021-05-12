<template>
  <button type="button" :class="$style.subscribeButton">Subscribe now</button>
</template>

<script lang="ts">
import Vue from 'vue'

interface SubscribeButtonProps {
  priceId: string
}

export default Vue.extend<unknown, unknown, unknown, SubscribeButtonProps>({
  props: {
    priceId: {
      type: String,
      default: '',
    },
  },
})
</script>

<style module lang="scss" src="./styles.module.scss"></style>
