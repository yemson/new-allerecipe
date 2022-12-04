<template>
  <div>
    <nav
      class="navbar nav-dark bg-success"
    >
      <div class="container">
        <router-link
          class="navbar-brand fs-4 text-light"
          to="/"
        >
          Allerecipe
        </router-link>
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
            <!-- TODO: 드롭다운 쓰는데 왜 자꾸 팝업 경고 뜨냐 개빡치게 -->
            <div class="dropdown">
              <button
                class="btn fw-bold text-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                더보기
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link
                    class="dropdown-item"
                    type="button"
                    to="/my-page"
                  >
                    마이페이지
                  </router-link>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    @click="logout"
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
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
