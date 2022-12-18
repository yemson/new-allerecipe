<template>
  <div class="my-page">
    <Nav />
    <div class="container">
      <!-- TODO: 나이, 보유중인 알레르기 등 기본적인 회원 정보요! 그리고 최근에 담아둔(하트 한) 레시피 글들을 목록으로 보여주면 좋을 거 같아요..! -->
      <!--      <div class="px-2">-->
      <!--        <div class="card mt-4 text-start">-->
      <!--          <div class="card-body">-->
      <!--            <h5 class="card-title">-->
      <!--              {{ user.email }}-->
      <!--            </h5>-->
      <!--            <hr class="mt-1">-->
      <!--            <div class="text-muted">-->
      <!--              보유중인 알레르기-->
      <!--            </div>-->
      <!--            <div class="row-cols-3">-->
      <!--              <div-->
      <!--                v-for="(allergy, index) in allergic"-->
      <!--                :key="index"-->
      <!--              >-->
      <!--                <div v-if="allergy === true">-->
      <!--                  <span class="badge text-bg-success col">{{ index }}</span>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <MyRecipe />
      <div class="container">
        <div class="fs-4 fw-bold text-success text-start">
          좋아요한 레시피
        </div>
        <hr class="mt-2">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
          <div
            v-for="(recipe, index) in likeRecipes"
            :key="index"
          >
            <div class="col mb-4">
              <router-link
                :to="`/recipe-detail/${recipe.id}`"
                style="text-decoration: none; color: inherit"
              >
                <div
                  class="card shadow border-0"
                  style="width: auto; height: 26rem;"
                >
                  <img
                    :src="recipe.recipeImage"
                    class="card-img-top"
                    height="200"
                  >
                  <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 class="card-title fw-bold">
                        {{ recipe.recipeName }}
                      </h5>
                      <p class="card-text fw-500">
                        {{ recipe.recipeDescription }}
                      </p>
                    </div>
                    <div class="text-muted d-flex justify-content-end">
                      {{ new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(recipe.created)) }}
                    </div>
                  </div>
                  <div class="card-footer text-muted fs-6 bg-white card-footer d-flex justify-content-between">
                    <div>{{ recipe.userEmail }}</div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        class="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                      {{ recipe.likeCount }}
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
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
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'

export default {
  name: 'MyPage',
  components: {
    MyRecipe,
    Nav
  },
  data () {
    return {
      user: '',
      likeRecipes: [],
      allergic: {}
    }
  },
  created () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        this.getMyLikeRecipes()
        this.getMyAllergic()
      }
    })
  },
  methods: {
    async getMyAllergic () {
      const allergic = await getDoc(doc(db, `users/${this.user.uid}`))
      this.allergic = allergic.data().allergic
    },
    getMyLikeRecipes () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(collection(db, 'recipe_post'), where('recipeLikes', 'array-contains', `${user.uid}`))
          onSnapshot(q, (snapshot) => {
            this.likeRecipes = []
            snapshot.forEach((doc) => {
              this.likeRecipes.push({
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
