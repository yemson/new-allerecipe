<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <Nav />
    <div class="container">
      <div class="d-flex">
        <div class="flex-grow-1 fs-4 fw-bold text-success text-start mt-4">
          레시피 제작
        </div>
        <input
          id="btn-check"
          v-model="isPublic"
          autocomplete="off"
          class="btn-check"
          type="checkbox"
        >
        <div v-if="isPublic">
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
      <div class="form-floating my-2">
        <input
          id="searchInput"
          v-model="searchRecipe"
          class="form-control"
          placeholder="레시피 검색"
          type="search"
        >
        <label for="searchInput">레시피 검색</label>
      </div>
      <div class="list-group">
        <div
          v-for="(item, index) in items"
          :key="index"
        >
          <button
            class="list-group-item list-group-item-action"
            type="button"
            @click="selectRecipe(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <hr class="mt-2">
      <div class="fs-4 fw-bold text-success text-start mt-4 mb-2">
        레시피 재료
      </div>
      <div class="row row-cols-6 text-center">
        <div
          v-for="(item, index) in allergic"
          :key="index"
        >
          <div class="col mb-2">
            <div class="dropdown d-grid gap-2">
              <select
                :disabled="item.isAllergic"
                aria-label="Default select example"
                class="form-select"
              >
                <option
                  selected
                >
                  {{ item.name }}
                </option>
                <option
                  v-for="(value, replaceItems, index2) in replaceAller"
                  v-if="item.name.includes(replaceItems)"
                  :key="index2"
                >
                  <div
                    v-for="(j, i) in value"
                    :key="i"
                  >
                    {{ j }}
                  </div>
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-2">
      <div v-if="recipeName !== ''">
        <div class="fs-4 fw-bold text-success text-start mt-2">
          레시피 설명
        </div>
        <div class="form-floating mb-3 mt-2">
          <input
            id="floatingInput"
            v-model="recipeDescription"
            class="form-control"
            placeholder=""
            type="text"
          >
          <label for="floatingInput">레시피 설명</label>
        </div>
        <div class="mb-3">
          <input
            id="formFile"
            class="form-control"
            type="file"
            @change="onFileChange"
          >
        </div>
      </div>
      <div
        v-for="(step, index) in recipeInfo"
        :key="index"
      >
        <div class="col-4 text-start fs-4 fw-bold text-success mt-2">
          {{ index + 1 }}단계
        </div>
        <div class="form-floating mt-1">
          <textarea
            id="stepArea"
            v-model="recipeInfo[index]"
            class="form-control"
            placeholder="이곳에 레시피를 작성하세요"
            style="height: 100px"
          />
          <label for="stepArea">이곳에 레시피를 작성하세요</label>
        </div>
      </div>
      <div v-if="recipeName !== ''">
        <div class="d-grid gap-2 mt-3 mb-4">
          <button
            class="btn btn-success"
            type="button"
            @click="saveRecipe"
          >
            레시피 생성
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
import { addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, db, storage } from '@/main'

export default {
  name: 'CreateRecipe',
  components: {
    Nav
  },
  data () {
    return {
      searchRecipe: '',
      items: [],
      userEmail: '',
      userUID: '',
      recipeInfo: {},
      allergic: [],
      recipeDescription: '',
      recipeName: '',
      recipeImage: null,
      replaceAller: {
        계란: ['소고기', '돼지고기', '생선', '두부'],
        달걀: ['소고기', '돼지고기', '생선', '두부'],
        우유: ['두부', '콩', '호두', '땅콩', '견과류'],
        콩: ['김', '미역', '멸치'],
        돼지고기: ['소고기', '닭고기', '참치', '두부', '흰 살 생선'],
        닭고기: ['소고기', '돼지고기', '참치', '두부', '고등어', '오징어', '콩'],
        새우: ['동태'],
        토마토: ['당근', '시금치', '브로콜리', '파프리카'],
        복숭아: ['배', '딸기'],
        메밀: ['밀가루'],
        밀가루: ['전분가루', '쌀가루']
      },
      isPublic: true
    }
  },
  watch: {
    searchRecipe: debounce(function () {
      this.items = []
      axios.get('https://openapi.foodsafetykorea.go.kr/api/d35f685e1fcf4194b1b4/COOKRCP01/json/1/5/RCP_NM=' + this.searchRecipe)
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
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    selectRecipe (recipeItem) {
      this.recipeInfo = []
      this.allergic = []
      const allergicList = ['계란', '달걀', '우유', '콩', '돼지고기', '닭고기', '꽃게', '새우', '토마토', '복숭아', '메밀', '밀가루']
      // d35f685e1fcf4194b1b4
      axios.get('https://openapi.foodsafetykorea.go.kr/api/d35f685e1fcf4194b1b4/COOKRCP01/json/1/1/RCP_NM=' + recipeItem)
        .then(response => {
          const parseRecipe = JSON.parse(response.request.response)
          const allergics = parseRecipe.COOKRCP01.row[0].RCP_PARTS_DTLS.split(/,|\n/)
          for (const c in allergics) {
            let checkAllergic = true
            for (const d in allergicList) {
              if (allergics[c].includes(allergicList[d])) {
                checkAllergic = false
              }
            }
            this.allergic.push({
              name: allergics[c].replace(/[0-9]+g|[()]/g, '').replaceAll(' ', ''),
              isAllergic: checkAllergic
            })
          }
          this.recipeName = parseRecipe.COOKRCP01.row[0].RCP_NM
          for (const i in parseRecipe.COOKRCP01.row[0]) {
            if (i.includes('MANUAL0') || i.includes('MANUAL1')) {
              if (parseRecipe.COOKRCP01.row[0][i] !== '') {
                const replaceRecipe = parseRecipe.COOKRCP01.row[0][i].replace(/\n/g, ' ')
                this.recipeInfo.push(replaceRecipe)
              }
            }
          }
          this.recipeInfo.sort()
        })
        .catch(error => {
          console.log(error)
        })
    },
    async saveRecipe () {
      const docRef = await addDoc(collection(db, 'recipe_post'), {
        userEmail: this.userEmail,
        userUID: this.userUID,
        recipeName: this.recipeName,
        recipeInfo: this.recipeInfo,
        recipeDescription: this.recipeDescription,
        recipeLikes: [],
        recipeImage: this.recipeImage,
        isPublic: this.isPublic
      })
      console.log('Document written with ID: ', docRef.id)
      this.$toast.success('레시피를 생성했습니다!', {
        position: 'top-center',
        timeout: 3000
      })
      this.$router.push('/')
    },
    checkAuth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userEmail = user.email
          this.userUID = user.uid
        }
      })
    },
    onFileChange (e) {
      const file = e.target.files[0]
      const imageRef = ref(storage, 'image/' + file.name)
      uploadBytesResumable(imageRef, file)
        .then((snapshot) => {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.')
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at', url)
            this.recipeImage = url
          })
        }).catch((error) => {
          console.error('Upload failed', error)
        })
    }
  }
}
</script>

<style>

</style>
