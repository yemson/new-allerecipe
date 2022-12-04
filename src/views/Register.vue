<template>
  <div>
    <Nav />
    <div class="row">
      <div class="col col-sm-2 col-md-2 col-lg-3 col-xl-4 col-xxl-4" />
      <div class="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        <div
          class="card shadow-sm"
          style="height: 42em; margin: 4em auto 0;"
        >
          <div
            class="card-body"
            style="text-align: left;"
          >
            <div
              class="card-title; mx-3 mt-2 fw-bold"
              style="font-size: 2.5em;"
            >
              회원가입
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
              >
            </div>
            <div
              class="mx-3"
              style="margin-top: 1.5rem;"
            >
              <label
                class="form-label fw-bold"
                for="passwordInput"
              >비밀번호 확인</label>
              <input
                id="passwordInput"
                v-model="passwordCheck"
                class="form-control shadow-sm fw-bold"
                placeholder="비밀번호 입력"
                type="password"
              >
            </div>
            <div class="mx-3 mt-3">
              <div class="fw-bold mb-2">
                보유 알레르기 선택
              </div>
              <div class="row row-cols-3 mx-3">
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.egg"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    계란
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.milk"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    우유
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.peanut"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    땅콩
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.pork"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    돼지고기
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.chicken"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    닭고기
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.peach"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    복숭아
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.wheat"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    메밀
                  </label>
                </div>
                <div class="form-check col">
                  <input
                    id="flexCheckDefault"
                    v-model="allergic.flour"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    밀가루
                  </label>
                </div>
              </div>
              <div
                class="d-grid gap-2 mx-3"
                style="margin-top: 2.5rem;"
              >
                <button
                  class="btn btn-success mb-2 shadow-sm fw-bold"
                  type="button"
                  @click="register"
                >
                  회원가입
                </button>
                <router-link
                  class="btn btn-outline-success shadow-sm fw-bold"
                  to="/login"
                  type="button"
                >
                  로그인
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-2 col-md-2 col-lg-6 col-xl-4 col-xxl-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/main'
import Nav from '@/components/Nav.vue'

export default {
  name: 'Register',
  components: {
    Nav
  },
  data () {
    return {
      email: '',
      password: '',
      passwordCheck: '',
      allergic: {
        egg: false,
        milk: false,
        peanut: false,
        pork: false,
        chicken: false,
        peach: false,
        wheat: false,
        flour: false
      }
    }
  },
  created () {
    this.checkLoginInfo()
  },
  methods: {
    // 로그인 상태일 시 메인 페이지로 이동
    checkLoginInfo () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push('/').catch(() => {})
        }
      })
    },
    register () {
      if (this.password !== this.passwordCheck) {
        this.$toast.error('비밀번호가 일치하지 않습니다!', {
          position: 'top-center',
          timeout: 2000
        })
      } else {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            setDoc(doc(db, `users/${auth.currentUser.uid}`), {
              allergic: this.allergic
            })
            this.$router.push('/')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
      }
    }
  }
}
</script>

<style>

</style>
