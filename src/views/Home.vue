<template>
  <div class="home">
    <Nav />
    <SharedRecipe />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import SharedRecipe from '../components/SharedRecipe.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    SharedRecipe,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>
