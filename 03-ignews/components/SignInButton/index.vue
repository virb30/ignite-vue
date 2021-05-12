<template>
  <button v-if="isUserLoggedIn" type="button" :class="$style.signInButton">
    <FontAwesomeIcon color="#04d361" :icon="['fab', 'github']" />
    Vinícius Bôscoa
    <XIcon color="#737380" :class="$style.closeIcon" />
  </button>
  <button v-else type="button" :class="$style.signInButton">
    <FontAwesomeIcon color="#eba417" :icon="['fab', 'github']" />
    Sign in with github
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { XIcon } from 'vue-feather-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub)

interface Data {
  isUserLoggedIn: boolean
}

export default Vue.extend<Data, unknown, unknown, []>({
  components: {
    XIcon,
    FontAwesomeIcon,
  },
  data() {
    return {
      isUserLoggedIn: true,
    }
  },
})
</script>

<style module src="./styles.module.scss" lang="scss" scoped></style>
