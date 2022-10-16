<template>
  <div>
    <Nav />
    <div class="container">
      <div class="fs-4 fw-bold text-success text-start mt-4">
        레시피 제작
      </div>
      <div class="form-floating my-2">
        <input
          id="searchInput"
          v-model="searchRecipe"
          type="search"
          class="form-control"
          placeholder="레시피 검색"
        >
        <label for="searchInput">레시피 검색</label>
      </div>
      <div class="list-group">
        <div
          v-for="(item, index) in items"
          :key="index"
        >
          <button
            type="button"
            class="list-group-item list-group-item-action"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import axios from 'axios'
import { debounce } from 'debounce'

export default {
  name: 'CreateRecipe',
  components: {
    Nav
  },
  data () {
    return {
      searchRecipe: '',
      items: []
    }
  },
  watch: {
    searchRecipe: debounce(function () {
      this.items = []
      axios.get('http://openapi.foodsafetykorea.go.kr/api/d35f685e1fcf4194b1b4/COOKRCP01/json/1/5/RCP_NM=' + this.searchRecipe)
        .then(response => {
          const parseRecipe = JSON.parse(response.request.response)
          for (let i = 0; i < 5; i++) {
            console.log(parseRecipe.COOKRCP01.row[i].RCP_NM)
            this.items.push(parseRecipe.COOKRCP01.row[i].RCP_NM)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }, 300)
  }
}
</script>

<style>

</style>
