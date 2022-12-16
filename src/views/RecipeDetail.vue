<template>
  <div>
    <Nav />
    <div
      class="container mt-4"
      style="max-width: 50rem;"
    >
      <div v-if="recipeDetail.forkUID">
        <div class="text-muted text-start">
          {{ recipeDetail.forkUID }} -> {{ recipeDetail.uid }}
        </div>
      </div>
      <div class="d-flex">
        <div class="flex-grow-1 text-start fs-4 fw-bold text-success">
          {{ recipeDetail.recipeName }}
        </div>
        <div v-if="recipeDetail.userUID === userUID">
          <router-link
            :to="`/modify-recipe/${this.$route.params.id}`"
            class="btn btn-outline-success text-end align-self-end"
          >
            수정
          </router-link>
          <div
            class="btn btn-danger"
            style="margin-left: 0.5em;"
            @click="deleteRecipe"
          >
            삭제
          </div>
        </div>
      </div>
      <div class="text-start text-muted fs-5 mb-2">
        {{ recipeDetail.recipeDescription }}
      </div>
      <img
        :src="recipeDetail.recipeImage"
        alt="recipeImage"
        class="rounded"
        style="width: 100%; height: 15rem; object-fit: cover;"
      >
      <hr class="mt-2">
      <div
        v-for="(recipe, index) in recipeDetail.recipeInfo"
        :key="index"
      >
        <div
          :aria-controls="'collapse' + index"
          :data-bs-target="`#collapse${index}`"
          aria-expanded="false"
          class="card shadow-sm my-3"
          data-bs-toggle="collapse"
        >
          <div class="card-body fw-500 text-start">
            {{ recipe }}
          </div>
        </div>
        <div
          :id="`collapse${index}`"
          class="collapse"
        >
          <div
            v-for="(stepComment, stepIndex) in stepComments"
            :key="stepIndex"
          >
            <div
              v-if="index === stepComment.comment.indexOf(stepComment.comment.at(-1))"
              class="px-2"
            >
              <div class="d-flex fw-bold mt-3 mb-1">
                {{ stepComment.userEmail }}
                <span
                  class="ms-3 text-muted fw-500 align-self-end"
                  style="font-size: 12px"
                >
                  약 2개월 전
                </span>
              </div>
              <div class="d-flex text-muted mb-4">
                {{ stepComment.comment.at(-1) }}
              </div>
            </div>
          </div>
          <hr class="mt-2">
          <textarea
            id="commentArea"
            v-model="inputStepComment[index]"
            :disabled="!canAccess"
            class="form-control"
            placeholder="이곳에 댓글을 작성하세요"
            style="height: 80px"
          />
          <div class="d-flex justify-content-end mt-3 mb-4">
            <button
              :disabled="!canAccess"
              class="btn btn-success fw-semibold"
              type="button"
              @click="createStepComment"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex mt-4 mb-3">
        <div
          class="flex-grow-1 text-start pt-1 fw-bold fs-6"
          style="font-size: 0.8rem;"
        >
          작성자: {{ recipeDetail.userEmail }}
        </div>
        <div v-if="canAccess">
          <i
            class="bi bi-bookmark-plus fs-5"
            data-bs-target="#exampleModal"
            data-bs-toggle="modal"
            style="margin-right: 1rem"
          />
          <div
            id="exampleModal"
            aria-hidden="true"
            aria-labelledby="exampleModalLabel"
            class="modal fade"
            tabindex="-1"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    id="exampleModalLabel"
                    class="modal-title fs-5 fw-bold"
                  >
                    레시피 스크랩
                  </h1>
                  <button
                    aria-label="Close"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    type="button"
                  />
                </div>
                <div class="modal-body fw-semibold">
                  {{ recipeDetail.recipeName }}을(를) 스크랩 하시겠습니까?
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    취소
                  </button>
                  <button
                    class="btn btn-success"
                    data-bs-dismiss="modal"
                    type="button"
                    @click="forkRecipe"
                  >
                    스크랩하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="canAccess">
          <div v-if="!clicked">
            <i
              class="bi bi-heart fs-5"
              @click="likeRecipe"
            />
          </div>
          <div v-else>
            <i
              class="bi bi-heart-fill fs-5"
              @click="likeRecipe"
            />
          </div>
        </div>
      </div>
      <hr class="mt-2 mb-3">
      <div class="text-start fs-4 fw-bold text-success mb-2 mt-4">
        댓글 작성
      </div>
      <div class="form-floating mt-1">
        <textarea
          id="commentArea"
          v-model="inputComment"
          :disabled="!canAccess"
          class="form-control"
          placeholder="이곳에 댓글을 작성하세요"
          style="height: 100px"
        />
        <label for="commentArea">이곳에 댓글을 작성하세요</label>
      </div>
      <div class="d-flex mt-3 mb-4 justify-content-end">
        <button
          :disabled="!canAccess"
          class="btn btn-success fw-semibold"
          type="button"
          @click="createComment"
        >
          댓글 작성
        </button>
      </div>
      <div v-if="comments.length === 0">
        <p class="text-muted text-start mt-2 fw-500 px-2 mb-5">
          댓글이 없습니다.
        </p>
      </div>
      <div
        v-else
        class="mb-5"
      >
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="px-2"
        >
          <div class="d-flex fw-bold mt-3 mb-1">
            {{ comment.userEmail }}
            <span
              class="ms-3 text-muted fw-500 align-self-end"
              style="font-size: 12px"
            >
              약 2개월 전
            </span>
          </div>
          <div class="d-flex text-muted mb-4">
            {{ comment.comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/main'

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
      userEmail: '',
      comments: [],
      inputStepComment: [],
      stepComments: [],
      canAccess: false,
      clicked: false,
      likeCount: 0
    }
  },
  mounted () {
    this.getRecipeDetail()
    this.getUserInfo()
    this.getComments()
    this.getStepComments()
  },
  updated () {
    this.checkLike()
  },
  methods: {
    async getRecipeDetail () {
      const post = await getDoc(doc(db, `recipe_post/${this.$route.params.id}`))
      this.recipeDetail = post.data()
    },
    async createComment () {
      try {
        if (this.inputComment.length === 0) {
          this.$toast.error('댓글을 작성해주세요!', {
            position: 'top-center',
            timeout: 3000
          })
        } else {
          const docRef = await addDoc(collection(db, `recipe_post/${this.$route.params.id}/comments`), {
            comment: this.inputComment,
            createdAt: Date.now(),
            userUID: this.userUID,
            userEmail: this.userEmail
          })
          console.log('Document written with ID: ', docRef.id)
          this.inputComment = ''
          this.$toast.success('댓글을 작성했습니다!', {
            position: 'top-center',
            timeout: 3000
          })
        }
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async createStepComment () {
      try {
        const docRef = await addDoc(collection(db, `recipe_post/${this.$route.params.id}/step_comments`), {
          comment: this.inputStepComment,
          createdAt: Date.now(),
          userUID: this.userUID,
          userEmail: this.userEmail
        })
        console.log('Document written with ID: ', docRef.id)
        this.inputStepComment = []
        this.$toast.success('댓글을 작성했습니다!', {
          position: 'top-center',
          timeout: 3000
        })
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
    async getStepComments () {
      const q = query(collection(db, `recipe_post/${this.$route.params.id}/step_comments`), orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.stepComments = []
        snapshot.forEach((doc) => {
          this.stepComments.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    },
    getUserInfo () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userUID = user.uid
          this.userEmail = user.email
          this.canAccess = true
        } else {
          this.canAccess = false
        }
      })
    },
    async likeRecipe () {
      const post = await getDoc(doc(db, `recipe_post/${this.$route.params.id}`))
      const recipeLikes = post.data().recipeLikes
      this.clicked = !this.clicked
      if (this.clicked) {
        recipeLikes.push(auth.currentUser.uid)
        this.likeCount = recipeLikes.length
      } else {
        recipeLikes.splice(recipeLikes.indexOf(auth.currentUser.uid), 1)
        this.likeCount = recipeLikes.length
      }
      await updateDoc(doc(db, `recipe_post/${this.$route.params.id}`), {
        recipeLikes,
        likeCount: this.likeCount
      })
    },
    async checkLike () {
      const post = await getDoc(doc(db, `recipe_post/${this.$route.params.id}`))
      const recipeLikes = post.data().recipeLikes
      this.likeCount = recipeLikes.length
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.clicked = !!recipeLikes.includes(user.uid)
        }
      })
    },
    async deleteRecipe () {
      if (confirm('정말 삭제하시겠습니까?')) {
        await deleteDoc(doc(db, `recipe_post/${this.$route.params.id}`))
        this.$toast.success('삭제되었습니다!', {
          position: 'top-center',
          timeout: 3000
        })
        this.$router.push('/').catch(() => {
        })
      }
    },
    forkRecipe: async function () {
      const docRef = await addDoc(collection(db, 'recipe_post'), {
        uid: this.userUID,
        email: this.userEmail,
        forkUID: this.recipeDetail.userUID,
        forkEmail: this.recipeDetail.userEmail,
        recipeName: this.recipeDetail.recipeName,
        recipeInfo: this.recipeDetail.recipeInfo,
        recipeDescription: this.recipeDetail.recipeDescription,
        recipeLikes: [],
        recipeImage: this.recipeDetail.recipeImage,
        isPublic: false,
        likeCount: 0
      })
      console.log('Document written with ID: ', docRef.id)
      this.$toast.success('레시피를 스크랩했습니다!', {
        position: 'top-center',
        timeout: 3000
      })
      this.$router.push(`/fork-recipe/${docRef.id}`).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.fw-500 {
  font-weight: 500;
}
</style>
