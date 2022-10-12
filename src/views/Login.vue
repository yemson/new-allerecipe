<template>
  <div>
    <Nav />
    <div
      class="card shadow-sm"
      style="width: 30em; height: 28em; margin: 4em auto 0;"
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
            for="emailInput"
            class="form-label fw-bold"
          >이메일</label>
          <input
            id="emailInput"
            v-model="email"
            type="email"
            class="form-control shadow-sm fw-bold"
            placeholder="이메일 입력"
          >
        </div>
        <div
          class="mx-3"
          style="margin-top: 1.5rem;"
        >
          <label
            for="passwordInput"
            class="form-label fw-bold"
          >비밀번호</label>
          <input
            id="passwordInput"
            v-model="password"
            type="password"
            class="form-control shadow-sm fw-bold"
            placeholder="비밀번호 입력"
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
          <!-- TODO: 회원가입 페이지 만들고 링크 -->
          <!-- <router-link
            class="btn btn-outline-success shadow-sm fw-bold"
            type="button"
            to="/register"
          >
            회원가입
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth'
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
          this.$router.push('/')
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
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>

</style>
