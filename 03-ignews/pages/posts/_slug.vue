<template>
	<main :class="$style.container">
		<article :class="$style.post">
			<h1>{{ post.title }}</h1>
			<time>{{ post.updatedAt }}</time>
			<div :class="$style.postContent" v-html="post.content" />
		</article>
	</main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { RichText } from 'prismic-dom';
import Vue from 'vue';
import { getSession } from '~/services/getSession';
import { getPrismicClient } from '~/services/prismic';

interface Post {
	slug: string;
	title: string;
	content: string;
	updatedAt: string;
}

interface Data {
	post: Post
}

export default Vue.extend<Data, unknown, unknown, []>({
	fetchOnServer: true,
	data () {
		return {
			post: {} as Post,
		};
	},
	head () {
		return {
			title: `${this.post.title} | Ignews`,
		};
	},
	async asyncData ({ req, params, redirect, $auth }: Context) {
		const { slug } = params;

		const session = getSession(String($auth.$storage.getUniversal('_session')));

		if (!session?.user.activeSubscription) {
			redirect(302, '/');
		}

		const prismic = getPrismicClient(req);

		const response = await prismic.getByUID('post', String(slug), {});

		const post = {
			slug,
			title: RichText.asText(response.data.title),
			content: RichText.asHtml(response.data.content),
			updatedAt: new Date(String(response.last_publication_date)).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		};

		return {
			post,
		};
	},

});
</script>

<style lang="scss" scoped module src="./post.module.scss"></style>
