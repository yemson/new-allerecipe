<template>
  <div>
    <nav
      class="navbar nav-dark bg-success"
    >
      <div class="container">
        <a class="navbar-brand fs-4 text-light">Allerecipe</a>
        <form
          class="d-flex"
        >
          <div v-if="user == null">
            <router-link
              class="btn fw-bold text-light"
              to="/login"
            >
              로그인
            </router-link>
          </div>
          <div v-if="user !== null">
            <button
              class="btn fw-bold text-light"
              @click="logout"
            >
              로그아웃
            </button>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/main'

export default {
  name: 'Nav',
  data () {
    return {
      user: null
    }
  },
  created () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
        }
      })
    },
    logout () {
      auth.signOut()
        .then(() => {
          this.user = null
          this.$router.push('/').catch(() => {})
        })
    }
  }
}
</script>

<style>

</style>
