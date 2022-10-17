<template>
  <div>
    <Nav />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-6 text-start fs-4 fw-bold text-success">
          {{ recipeDetail.recipeName }}
        </div>
        <!-- TODO: 좋아요랑 스크랩 메소드 적용 -->
        <div class="col-6 text-end align-self-end">
          <i
            class="bi bi-bookmark fs-4"
            style="margin-right: 0.8rem;"
          />
          <i class="bi bi-heart fs-4" />
        </div>
        <div class="text-start text-muted fs-5 mb-2">
          {{ recipeDetail.recipeDescription }}
        </div>
        <!-- TODO: 작성자 이름 크기 반응형 필요 -->
        <!-- <div class="col-6 text-end align-self-end">
          작성자: {{ recipeDetail.uid }}
        </div> -->
      </div>
      <img
        :src="recipeDetail.recipeImage"
        style="width: 100%; height: 30rem; object-fit: cover;"
      >
      <hr class="mt-2">
      <div
        v-for="(recipe, index) in recipeDetail.recipeInfo"
        :key="index"
      >
        <div
          class="card shadow-sm my-3"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse${index}`"
          aria-expanded="false"
          :aria-controls="'collapse' + index"
        >
          <div class="card-body fw-bold text-start">
            {{ recipe }}
          </div>
        </div>
        <div
          :id="`collapse${index}`"
          class="collapse"
        >
          <textarea
            id="commentArea"
            v-model="inputStepComment[index]"
            class="form-control"
            placeholder="이곳에 댓글을 작성하세요"
            style="height: 80px"
          />
          <div class="d-grid gap-2 mt-3 mb-4">
            <!-- TODO: 로그인 아닐 시 버튼 비활성화 -->
            <button
              class="btn btn-success"
              type="button"
              @click="createStepComment"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>
      <div class="col-4 text-start fs-4 fw-bold text-success">
        댓글
      </div>
      <div v-if="comments.length == 0">
        <p class="text-muted text-start mt-2">
          댓글이 없습니다.
        </p>
      </div>
      <div v-else>
        <div
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="card shadow-sm my-3">
            <div class="card-header text-start">
              {{ comment.userUID }}
            </div>
            <div class="card-body fw-bold text-start">
              {{ comment.comment }}
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-2">
      <div class="col-4 text-start fs-4 fw-bold text-success">
        댓글 작성
      </div>
      <div class="form-floating mt-1">
        <textarea
          id="commentArea"
          v-model="inputComment"
          class="form-control"
          placeholder="이곳에 댓글을 작성하세요"
          style="height: 100px"
        />
        <label for="commentArea">이곳에 댓글을 작성하세요</label>
      </div>
      <div class="d-grid gap-2 mt-3 mb-4">
        <!-- TODO: 로그인 아닐 시 버튼 비활성화 -->
        <button
          class="btn btn-success"
          type="button"
          @click="createComment"
        >
          댓글 작성
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { getDoc, doc, addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '@/main'

export default {
  name: 'RecipeDetail',
  components: {
    Nav
  },
  data () {
    return {
      recipeDetail: [],
      inputComment: '',
      userUID: '',
      comments: [],
      inputStepComment: []
    }
  },
  mounted () {
    this.getRecipeDetail()
    this.getUserUID()
    this.getComments()
  },
  methods: {
    async getRecipeDetail () {
      const post = await getDoc(doc(db, `recipe_post/${this.$route.params.id}`))
      this.recipeDetail = post.data()
    },
    async createComment () {
      try {
        const docRef = await addDoc(collection(db, `recipe_post/${this.$route.params.id}/comments`), {
          comment: this.inputComment,
          createdAt: Date.now(),
          userUID: this.userUID
        })
        console.log('Document written with ID: ', docRef.id)
        this.inputComment = ''
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async createStepComment () {
      try {
        const docRef = await addDoc(collection(db, `recipe_post/${this.$route.params.id}/step_comments`), {
          comment: this.inputStepComment,
          createdAt: Date.now(),
          userUID: this.userUID
        })
        console.log('Document written with ID: ', docRef.id)
        this.inputStepComment = []
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async getComments () {
      const q = query(collection(db, `recipe_post/${this.$route.params.id}/comments`), orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.comments = []
        snapshot.forEach((doc) => {
          this.comments.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    },
    getUserUID () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userUID = user.uid
        }
      })
    }
  }
}
</script>

<style>

</style>
