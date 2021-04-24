<template>
  <div>
    <repository-list />
  </div>
</template>


<script>
import RepositoryList from './components/RepositoryList.vue';
import './styles/global.scss';
export default {
  components: {
    RepositoryList
  }
}
</script>


<style lang="scss">
.main 
{
  h1 {
    font-size: 80px;
  }
}

h1 {
  font-size: 20px;  
}
</style>