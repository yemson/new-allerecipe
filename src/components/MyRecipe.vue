<template>
  <div class="container mt-4">
    <div class="fs-4 fw-bold text-success text-start">
      나의 레시피
    </div>
    <hr class="mt-2">
    <!-- NOTE: 일단 카드 반응형인데 width 부분 auto 로 하면 크기가 들쭉 날쭉 함 -->
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
      <div class="col mb-4">
        <div v-if="user != null">
          <router-link
            style="text-decoration: none; color: inherit"
            to="/create-recipe"
          >
            <div
              class="card shadow-sm"
              style="width: auto; height: 26rem;"
            >
              <div class="card-body d-flex">
                <p class="card-text text-center align-self-center fw-bold fs-5">
                  나만의 레시피를 만들어보세요!
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div v-else-if="user == null">
          <div
            class="card shadow-sm"
            style="width: auto; height: 26rem;"
          >
            <div class="card-body d-flex">
              <p class="card-text text-center align-self-center fw-bold fs-5">
                로그인하여 나만의 레시피를 만들어보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(recipe, index) in recipes"
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
                alt="recipeImage"
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
                {{ recipe.uid }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '@/main'

export default {
  name: 'MyRecipe',
  components: {},
  data () {
    return {
      user: null,
      recipes: []
    }
  },
  mounted () {
    this.checkAuth()
    this.getMyRecipes()
  },
  methods: {
    getMyRecipes () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(collection(db, 'recipe_post'), where('uid', '==', `${user.uid}`))
          onSnapshot(q, (snapshot) => {
            this.recipes = []
            snapshot.forEach((doc) => {
              this.recipes.push({
                id: doc.id,
                ...doc.data()
              })
            })
          })
        }
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
