<template>
  <div>
    <nav class="navbar navbar-expand-md bg-light">
      <div class="container">
        <router-link
          class="navbar-brand text-success fw-bold"
          to="/"
        >
          Allerecipe
        </router-link>
        <button
          class="navbar-toggler border-0 fs-6"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarTogglerDemo02"
          class="collapse navbar-collapse justify-content-end"
        >
          <form
            class="d-flex align-items-end"
          >
            <button
              type="button"
              class="btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <div
              class="vr mx-2 align-self-center"
              style="width: 2px; height: 1.5rem"
            />
            <div v-if="user == null">
              <router-link
                class="btn btn-outline-success border-0 rounded-1 fw-bold me-2"
                to="/login"
              >
                로그인
              </router-link>
              <router-link
                class="btn btn-success rounded-1 fw-bold"
                to="/register"
              >
                회원가입
              </router-link>
            </div>
            <div v-if="user !== null">
              <!-- TODO: 드롭다운 쓰는데 왜 자꾸 팝업 경고 뜨냐 개빡치게 -->
              <div class="dropdown">
                <button
                  class="btn fw-bold dropdown-toggle opacity-50"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ user.email }}
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
