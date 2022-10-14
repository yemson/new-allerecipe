<template>
  <div class="home">
    <Nav />
    <!-- TODO: Carousel 추가 -->
    <MyRecipe />
    <SharedRecipe />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import MyRecipe from '../components/MyRecipe.vue'
import SharedRecipe from '../components/SharedRecipe.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    MyRecipe,
    SharedRecipe
  },
  data () {
    return {
    }
  }
}
</script>
