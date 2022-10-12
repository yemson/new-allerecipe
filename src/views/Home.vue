<template>
  <div class="home">
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  },
  data () {
    return {
    }
  }
}
</script>
