<template>
  <div>
    <nav
      class="navbar nav-dark"
      style="background-color: #68AB26;"
    >
      <div class="container">
        <a class="navbar-brand fs-4 text-light">Allerecipe</a>
        <form
          class="d-flex"
        >
          <button
            class="btn fw-bold text-light"
            type="submit"
          >
            로그인
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import { onAuthStateChanged, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/main'

export default {
  name: 'Nav',
  data () {
    return {
    }
  },
  methods: {
    login () {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, this.email, this.password)
        })
        .then(() => {
          this.user = auth.currentUser
          this.loginDialog = false
        })
        .catch(() => {
          this.errorLogin = true
        })
    },
    checkAuth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
        }
      })
    }
  }
}
</script>

<style>

</style>
