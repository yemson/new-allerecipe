<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between">
      <div class="fs-2 fw-bold text-success text-start align-self-end">
        공유 레시피
      </div>
      <div
        class="vr"
        style="width: 2px"
      />
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
          최신순
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
          인기순
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
            v-for="(recipe, index) in recipes"
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
                  <div class="card-body">
                    <h5 class="card-title fw-bold">
                      {{ recipe.recipeName }}
                    </h5>
                    <p class="card-text fw-semibold">
                      {{ recipe.recipeDescription }}
                    </p>
                  </div>
                  <div class="card-footer text-muted fs-6 bg-white">
                    {{ recipe.userEmail }}
                  </div>
                </div>
              </router-link>
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
          ...
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
