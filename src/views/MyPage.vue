<template>
  <div class="my-page">
    <Nav />
    <MyRecipe />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import MyRecipe from '@/components/MyRecipe'

export default {
  name: 'MyPage',
  components: {
    MyRecipe,
    Nav
  }
}
</script>

<style scoped>

</style>
