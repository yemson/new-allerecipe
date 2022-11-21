<template>
  <div class="home">
    <Nav />
    <MyRecipe />
    <SharedRecipe />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import MyRecipe from '../components/MyRecipe.vue'
import SharedRecipe from '../components/SharedRecipe.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    MyRecipe,
    SharedRecipe,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>
