<template>
  <div class="my-page">
    <Nav />
    <div class="container">
      <div class="card mt-4 text-start">
        <div class="card-body">
          <h5 class="card-title">
            {{ user.email }}
          </h5>
          <p class="card-text">
            {{ user.uid }}
          </p>
          <a
            href="#"
            class="btn btn-success"
          >회원정보 수정</a>
        </div>
      </div>
    </div>
    <MyRecipe />
    <div class="container">
      <div class="fs-4 fw-bold text-success text-start">
        좋아요한 레시피
      </div>
      <hr class="mt-2">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
        <div
          v-for="(recipe, index) in likeReecipes"
          :key="index"
        >
          <div class="col mb-4">
            <router-link
              :to="`/recipe-detail/${recipe.id}`"
              style="text-decoration: none; color: inherit"
            >
              <div
                class="card shadow-sm"
                style="width: auto; height: 26rem;"
              >
                <img
                  :src="recipe.recipeImage"
                  class="card-img-top"
                  height="200"
                >
                <div class="card-body">
                  <h5 class="card-title">
                    {{ recipe.recipeName }}
                  </h5>
                  <p class="card-text">
                    {{ recipe.recipeDescription }}
                  </p>
                </div>
                <div class="card-footer text-muted fs-6">
                  {{ recipe.userEmail }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/main'
import Nav from '@/components/Nav.vue'
import MyRecipe from '@/components/MyRecipe'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export default {
  name: 'MyPage',
  components: {
    MyRecipe,
    Nav
  },
  data () {
    return {
      user: null,
      likeReecipes: []
    }
  },
  mounted () {
    this.checkAuth()
    this.getMyLikeRecipes()
  },
  methods: {
    checkAuth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
        }
      })
    },
    getMyLikeRecipes () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(collection(db, 'recipe_post'), where('recipeLikes', 'array-contains', `${user.uid}`))
          onSnapshot(q, (snapshot) => {
            this.likeReecipes = []
            snapshot.forEach((doc) => {
              this.likeReecipes.push({
                id: doc.id,
                ...doc.data()
              })
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
