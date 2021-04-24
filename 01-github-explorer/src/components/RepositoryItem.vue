<template>
  <li>
      <strong>{{repository.name}}</strong>
      <p>{{repository.description}}</p>

      <a :href="repository.html_url">
        Acessar repositório
      </a>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
import { Repository } from '../interfaces/Repository';

export default Vue.extend({ 
  props: {
    repository: Object as () => Repository
  }
});
</script>

<style>

</style>