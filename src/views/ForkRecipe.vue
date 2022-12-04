<template>
  <div>
    <Nav />
    <div class="container mt-4">
      <div class="text-muted text-start">
        {{ recipeDetail.forkEmail }} -> {{ recipeDetail.email }}
      </div>
      <div class="d-flex">
        <div class="flex-grow-1 text-start fs-4 fw-bold text-success">
          {{ recipeDetail.recipeName }}
        </div>
        <input
          id="btn-check"
          v-model="recipeDetail.isPublic"
          autocomplete="off"
          class="btn-check"
          type="checkbox"
        >
        <div v-if="recipeDetail.isPublic">
          <label
            class="btn btn-success mt-4"
            for="btn-check"
          >레시피 공개</label>
        </div>
        <div v-else>
          <label
            class="btn btn-secondary mt-4"
            for="btn-check"
          >레시피 비공개</label>
        </div>
      </div>
      <div class="form-floating mb-3 mt-2">
        <input
          id="floatingInput"
          v-model="recipeDetail.recipeDescription"
          class="form-control"
          placeholder=""
          type="text"
        >
        <label for="floatingInput">레시피 설명</label>
      </div>
      <img
        :src="recipeDetail.recipeImage"
        alt="recipeImage"
        class="rounded"
        style="width: 100%; height: 15rem; object-fit: cover;"
      >
      <hr class="mt-2">
      <div
        v-for="(step, index) in recipeDetail.recipeInfo"
        :key="index"
      >
        <div class="col-4 text-start fs-4 fw-bold text-success mt-2">
          {{ index + 1 }}단계
        </div>
        <div class="form-floating mt-1">
          <textarea
            id="stepArea"
            v-model="recipeDetail.recipeInfo[index]"
            class="form-control"
            placeholder="이곳에 레시피를 작성하세요"
            style="height: 100px"
          />
          <label for="stepArea">이곳에 레시피를 작성하세요</label>
        </div>
      </div>
      <div class="d-grid gap-2 mt-3 mb-4">
        <button
          class="btn btn-success"
          type="button"
          @click="modifyRecipe"
        >
          레시피 스크랩
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import Nav from '@/components/Nav.vue'

export default {
  name: 'ModifyRecipe',
  components: {
    Nav
  },
  data () {
    return {
      recipeDetail: []
    }
  },
  mounted () {
    this.getRecipeDetail()
  },
  methods: {
    async getRecipeDetail () {
      const post = await getDoc(doc(db, `recipe_post/${this.$route.params.id}`))
      this.recipeDetail = post.data()
    },
    async modifyRecipe () {
      await updateDoc(doc(db, `recipe_post/${this.$route.params.id}`), {
        recipeDescription: this.recipeDetail.recipeDescription,
        recipeInfo: this.recipeDetail.recipeInfo,
        isPublic: this.recipeDetail.isPublic
      })
        .then(() => {
          this.$router.push({ name: 'RecipeDetail', params: { id: this.$route.params.id } })
        })
    }
  }
}
</script>

<style scoped>

</style>
