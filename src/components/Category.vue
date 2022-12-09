<template>
  <div class="container mt-3">
    <div class="row row-cols-auto">
      <!--      to="/category-view"-->
      <!--      :to="`/recipe-detail/${recipe.id}`"-->
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/steaming"
        type="button"
      >
        찌기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/boiling"
        type="button"
      >
        끓이기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/baking"
        type="button"
      >
        굽기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/frying"
        type="button"
      >
        튀기기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/stir-frying"
        type="button"
      >
        볶기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/etc"
        type="button"
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
