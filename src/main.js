import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = true

Vue.use(Toast)

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
// }

// ANCHOR: public repo니까 올리기 전에 이거 위에랑 바꾸고 커밋하기:
const firebaseConfig = {
  apiKey: 'AIzaSyCefLtppAt9PYjSpST-__acbtH-cisUTTg',
  authDomain: 'r-allerecipe.firebaseapp.com',
  projectId: 'r-allerecipe',
  storageBucket: 'r-allerecipe.appspot.com',
  messagingSenderId: '451845710266',
  appId: '1:451845710266:web:55f595d1b971fa5303fd83',
  measurementId: 'G-4QSRSS79VN'
}

const app = initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)
const auth = getAuth()
initializeFirestore(app, {
  ignoreUndefinedProperties: true
})
const db = getFirestore(app)
const storage = getStorage()

export { auth, db, storage }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
