<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between">
      <div class="fs-2 fw-bold text-success text-start align-self-end">
        공유 레시피
      </div>
      <!-- TODO: > 버튼 추가하셈 -->
    </div>
    <ul
      id="pills-tab"
      class="nav nav-tabs mb-2 mt-3 border-0"
      role="tablist"
    >
      <li
        class="nav-item"
        role="presentation"
      >
        <button
          id="pills-home-tab"
          aria-controls="pills-home"
          aria-selected="true"
          class="nav-link active fw-bold text-success"
          data-bs-target="#pills-home"
          data-bs-toggle="pill"
          role="tab"
          type="button"
        >
          인기순
        </button>
      </li>
      <li
        class="nav-item"
        role="presentation"
      >
        <button
          id="pills-profile-tab"
          aria-controls="pills-profile"
          aria-selected="false"
          class="nav-link fw-bold text-success"
          data-bs-target="#pills-profile"
          data-bs-toggle="pill"
          role="tab"
          type="button"
        >
          최신순
        </button>
      </li>
    </ul>
    <div
      id="pills-tabContent"
      class="tab-content"
    >
      <div
        id="pills-home"
        aria-labelledby="pills-home-tab"
        class="tab-pane fade show active"
        role="tabpanel"
        tabindex="0"
      >
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
          <div
            v-for="(recipe, index) in popularityRecipes"
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
      <div
        id="pills-profile"
        aria-labelledby="pills-profile-tab"
        class="tab-pane fade"
        role="tabpanel"
        tabindex="0"
      >
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-start">
          <div
            v-for="(recipe, index) in recentRecipes"
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
                      <h5
                        class="card-title fw-bold"
                      >
                        {{ recipe.recipeName }}
                      </h5>
                      <p
                        class="card-text fw-500"
                      >
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
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/main'

export default {
  name: 'SharedRecipe',
  components: {},
  data () {
    return {
      recentRecipes: [],
      popularityRecipes: []
    }
  },
  mounted () {
    this.getPopularityRecipe()
    this.getRecentRecipe()
  },
  methods: {
    async getPopularityRecipe () {
      const q = query(collection(db, 'recipe_post'), where('isPublic', '==', true), orderBy('likeCount', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.popularityRecipes = []
        snapshot.forEach((doc) => {
          this.popularityRecipes.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    },
    async getRecentRecipe () {
      const q = query(collection(db, 'recipe_post'), where('isPublic', '==', true), orderBy('created', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.recentRecipes = []
        snapshot.forEach((doc) => {
          this.recentRecipes.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.card:hover {
  transform: scale(1.1);
}
.card {
  transition: transform 0.2s ease;
}

.fw-500 {
  font-weight: 500;
}
</style>
