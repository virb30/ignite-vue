<template>
  <li>
      <strong>{{repository.name}}</strong>
      <p>{{repository.description}}</p>

      <a :href="repository.html_url">
        Acessar repositório
      </a>
    </li>
</template>

<script>
export default {
  props: {
    repository: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>