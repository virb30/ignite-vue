<template>
	<div>
		<Header />
		<Nuxt keep-alive />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/Header/index.vue';

export default Vue.extend({
	components: { Header },
});
</script>
