<template>
  <header :class="$style.headerContainer">
    <div :class="$style.headerContent">
      <img src="../../assets/images/logo.svg" alt="ig.news" />
      <nav>
        <a :class="$style.active">Home</a>
        <a>Posts</a>
      </nav>

      <SignInButton />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import SignInButton from '../SignInButton/index.vue'

export default Vue.extend({
  components: { SignInButton },
})
</script>

<style module src="./styles.module.scss" lang="scss" scoped></style>
