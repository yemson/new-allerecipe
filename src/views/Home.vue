<template>
  <div class="home">
    <Nav />
    <!-- TODO: Carousel 추가 -->
    <MyRecipe />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import MyRecipe from '../components/MyRecipe.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    MyRecipe
  },
  data () {
    return {
    }
  }
}
</script>
