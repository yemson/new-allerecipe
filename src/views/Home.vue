<template>
  <div class="home">
    <Nav />
    <Category />
    <SharedRecipe />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import SharedRecipe from '../components/SharedRecipe.vue'
import Footer from '../components/Footer.vue'
import Category from '@/components/Category.vue'

export default {
  name: 'Home',
  components: {
    Category,
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
