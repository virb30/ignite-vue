<template>
	<main :class="$style.container">
		<article :class="$style.post">
			<h1>{{ post.title }}</h1>
			<time>{{ post.updatedAt }}</time>
			<div :class="[$style.postContent, $style.previewContent]" v-html="post.content" />
			<div :class="$style.continueReading">
				Wanna continue reading?
				<NuxtLink to="/">
					<a>Subscribe now 🤗</a>
				</NuxtLink>
			</div>
		</article>
	</main>
</template>

<script lang="ts">
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

interface Session {
	user: {
		activeSubscription: object | null
	}
}

interface Data {
	post: Post,
	session: Session | null
}

interface Computed {
	session: Session | null
}

export default Vue.extend<Data, unknown, Computed, []>({
	data () {
		return {
			post: {} as Post,
			session: null,
		};
	},
	head () {
		return {
			title: `${this.post.title} | Ignews`,
		};
	},
	watch: {
		'session.user': {
			deep: true,
			immediate: true,
			handler (newValue, oldValue) {
				if (newValue !== oldValue) {
					if (this.session?.user.activeSubscription) {
						this.$router.push(`/posts/${this.post.slug}`);
					}
				}
			},
		},
	},
	async fetch () {
		const session = getSession(String(this.$auth.$storage.getUniversal('_session')));

		const { slug } = this.$route.params;

		const prismic = getPrismicClient();

		const response = await prismic.getByUID('post', String(slug), {});

		const post = {
			slug,
			title: RichText.asText(response.data.title),
			content: RichText.asHtml(response.data.content.splice(0, 3)),
			updatedAt: new Date(String(response.last_publication_date)).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		};

		this.post = post;
		this.session = session;
	},

});
</script>

<style lang="scss" src="../post.module.scss" module></style>
