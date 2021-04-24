<template>
  <section class="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <repository-item v-for="repository in repositories" :key="repository.name" :repository="repository"/>
      </ul>
    </section>
</template>

<script>
import RepositoryItem from "./RepositoryItem.vue"

export default {
  components: { RepositoryItem },
  data(){
    return {
      repositories: []
    }
  },
  mounted(){
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => this.repositories = data);
  }
}
</script>

<style lang="scss">
  @import '../styles/repositories.scss';
</style>