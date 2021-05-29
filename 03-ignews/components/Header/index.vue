<template>
	<header :class="$style.headerContainer">
		<div :class="$style.headerContent">
			<img src="../../assets/images/logo.svg" alt="ig.news">
			<nav>
				<NuxtLink exact to="/" :active-class="$style.active">
					Home
				</NuxtLink>
				<NuxtLink to="/posts" :active-class="$style.active">
					Posts
				</NuxtLink>
			</nav>

			<SignInButton />
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import SignInButton from '../SignInButton/index.vue';

export default Vue.extend({
	components: { SignInButton },
});
</script>

<style module src="./styles.module.scss" lang="scss" scoped></style>
