<template>
  <main :class="$style.container">
    <div :class="$style.posts">
      <a v-for="post in posts" :key="post.slug" href="#">
        <time>{{ post.updatedAt }}</time>
        <strong>{{ post.title }}</strong>
        <p>{{ post.excerpt }}</p>
      </a>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '~/services/prismic'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface Data {
  posts: Post[]
}

export default Vue.extend<Data, unknown, unknown, []>({
  async asyncData() {
    if (process.server) {
      const prismic = getPrismicClient()

      const response = await prismic.query(
        Prismic.predicates.at('document.type', 'post'),
        {
          fetch: ['publication.title', 'publication.content'],
          pageSize: 100,
        }
      )

      const posts = response.results.map((post) => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          excerpt:
            post.data.content.find(
              (content: any) => content.type === 'paragragh'
            )?.text ?? '',
          updatedAt: new Date(
            post.last_publication_date ?? ''
          ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
        }
      })

      return { posts }
    }
  },
  data() {
    return {
      posts: [],
    }
  },
  head: {
    title: 'Posts | Ignews',
  },
})
</script>

<style lang="scss" src="./styles.module.scss" module scoped></style>
