<template>
  <div class="container mt-3">
    <div class="row row-cols-auto">
      <!--      to="/category-view"-->
      <!--      :to="`/recipe-detail/${recipe.id}`"-->
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/찌기"
        type="button"
      >
        찌기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/끓이기"
        type="button"
      >
        끓이기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/굽기"
        type="button"
      >
        굽기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/튀기기"
        type="button"
      >
        튀기기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/볶기"
        type="button"
      >
        볶기
      </router-link>
      <router-link
        class="btn fw-bold fs-5 text-success border-0 me-2 col"
        to="/category-view/기타"
        type="button"
      >
        기타
      </router-link>
    </div>
    <hr style="margin-bottom: 2.4em;">
  </div>
</template>

<script>
export default {
  name: 'Category'
}
</script>

<style scoped>

</style>
