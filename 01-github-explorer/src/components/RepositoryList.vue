<template>
  <section class="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <repository-item v-for="repository in repositories" :key="repository.name" :repository="repository"/>
      </ul>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import RepositoryItem from "./RepositoryItem.vue";
import {Repository} from '../interfaces/Repository';


export default Vue.extend({
  components: { RepositoryItem },
  data: () => ({
      repositories: [] as Repository[],
  }),
  mounted(){
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => this.repositories = data);
  }
})
</script>

<style lang="scss">
  @import '../styles/repositories.scss';
</style>