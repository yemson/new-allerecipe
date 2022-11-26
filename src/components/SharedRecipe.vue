<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between">
      <div class="fs-4 fw-bold text-success text-start align-self-end">
        공유된 레시피
      </div>
      <div class="align-bottom">
        <div class="dropdown">
          <button
            id="dropdownMenuButton1"
            aria-expanded="false"
            class="btn btn-outline-success dropdown-toggle"
            data-bs-toggle="dropdown"
            type="button"
          >
            정렬
          </button>
          <ul
            aria-labelledby="dropdownMenuButton1"
            class="dropdown-menu"
          >
            <li>
              <a
                class="dropdown-item"
                href="#"
              >최신순</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
              >인기순</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="mt-2">
    <!-- NOTE: 일단 카드 반응형인데 width 부분 auto로 하면 크기가 들쭉 날쭉 함 -->
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
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
</template>

<script>
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/main'

export default {
  name: 'SharedRecipe',
  components: {},
  data () {
    return {
      recipes: []
    }
  },
  mounted () {
    this.getSharedRecipe()
  },
  methods: {
    async getSharedRecipe () {
      const q = query(collection(db, 'recipe_post'), where('isPublic', '==', true))
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
  }
}
</script>

<style scope>

</style>
