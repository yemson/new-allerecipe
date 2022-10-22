<template>
  <div>
    <Nav />
    <div class="row">
      <div class="col col-sm-2 col-md-2 col-lg-3 col-xl-4 col-xxl-4" />
      <div class="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        <div
          class="card shadow-sm"
          style="height: 28em; margin: 4em auto 0;"
        >
          <div
            class="card-body"
            style="text-align: left;"
          >
            <div
              class="card-title; mx-3 mt-2 fw-bold"
              style="font-size: 2.5em;"
            >
              로그인
            </div>
            <div
              class="mx-3"
              style="margin-top: 2rem;"
            >
              <label
                class="form-label fw-bold"
                for="emailInput"
              >이메일</label>
              <input
                id="emailInput"
                v-model="email"
                class="form-control shadow-sm fw-bold"
                placeholder="이메일 입력"
                type="email"
              >
            </div>
            <div
              class="mx-3"
              style="margin-top: 1.5rem;"
            >
              <label
                class="form-label fw-bold"
                for="passwordInput"
              >비밀번호</label>
              <input
                id="passwordInput"
                v-model="password"
                class="form-control shadow-sm fw-bold"
                placeholder="비밀번호 입력"
                type="password"
                @keyup.enter="login"
              >
            </div>
            <div
              class="d-grid gap-2 mx-3"
              style="margin-top: 2.5rem;"
            >
              <button
                class="btn btn-success mb-2 shadow-sm fw-bold"
                type="button"
                @click="login"
              >
                로그인
              </button>
              <router-link
                class="btn btn-outline-success shadow-sm fw-bold"
                to="/register"
                type="button"
              >
                회원가입
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-2 col-md-2 col-lg-6 col-xl-4 col-xxl-4" />
    </div>
  </div>
</template>

<script>
import { browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/main'
import Nav from '@/components/Nav.vue'

export default {
  name: 'Login',
  components: {
    Nav
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    this.checkLoginInfo()
  },
  methods: {
    // 로그인 함수
    login () {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, this.email, this.password)
        })
        .then(() => {
          console.log('Success Login')
          this.$toast.success('로그인 성공!', {
            position: 'top-center',
            timeout: 3000
          })
          this.$router.push('/').catch(() => {})
        })
        .catch((error) => {
          // this.errorLogin = true
          console.log(error)
        })
    },
    // 로그인 상태일 시 메인 페이지로 이동
    checkLoginInfo () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push('/').catch(() => {})
        }
      })
    }
  }
}
</script>

<style>

</style>
