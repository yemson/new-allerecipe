<template>
  <div class="container mt-3">
    <div class="row row-cols-auto">
      <!--      to="/category-view"-->
      <!--      :to="`/recipe-detail/${recipe.id}`"-->
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        찌기
      </router-link>
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        끓이기
      </router-link>
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        굽기
      </router-link>
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        튀기기
      </router-link>
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        볶기
      </router-link>
      <router-link
        type="button"
        class="btn fw-bold fs-5 text-success me-2 col"
      >
        기타
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category'
}
</script>

<style scoped>

</style>
