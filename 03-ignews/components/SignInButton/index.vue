<template>
  <button
    v-if="isUserLoggedIn"
    type="button"
    :class="$style.signInButton"
    @click="handleLogout"
  >
    <FontAwesomeIcon color="#04d361" :icon="['fab', 'github']" />
    Vinícius Bôscoa
    <XIcon color="#737380" :class="$style.closeIcon" />
  </button>
  <button
    v-else
    type="button"
    :class="$style.signInButton"
    @click="handleLogin"
  >
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

interface Computed {
  isUserLoggedIn: boolean
}

interface Methods {
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
}

export default Vue.extend<unknown, Methods, Computed, []>({
  components: {
    XIcon,
    FontAwesomeIcon,
  },
  computed: {
    isUserLoggedIn() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    async handleLogin() {
      const response = await this.$auth.loginWith('github')
      console.log(response)
    },
    async handleLogout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style module src="./styles.module.scss" lang="scss" scoped></style>
