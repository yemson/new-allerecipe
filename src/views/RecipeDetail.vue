<template>
  <div>
    <Nav />
    <div class="container mt-4">
      <div class="d-flex">
        <div class="flex-grow-1 text-start fs-4 fw-bold text-success">
          {{ recipeDetail.recipeName }}
        </div>
        <router-link
          :to="`/modify-recipe/${this.$route.params.id}`"
          class="btn btn-outline-success text-end align-self-end"
        >
          수정
        </router-link>
      </div>
      <div class="text-start text-muted fs-5 mb-2">
        {{ recipeDetail.recipeDescription }}
      </div>
      <img
        :src="recipeDetail.recipeImage"
        alt="recipeImage"
        class="rounded"
        style="width: 100%; height: 30rem; object-fit: cover;"
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
          <div class="card-body fw-bold text-start">
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
            <div v-if="index === stepComment.comment.indexOf(stepComment.comment.at(-1))">
              <div class="card mb-3">
                <div class="card-header text-start">
                  {{ stepComment.userUID }}
                </div>
                <div class="card-body text-start fw-bold">
                  {{ stepComment.comment.at(-1) }}
                </div>
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
          <div class="d-grid gap-2 mt-3 mb-4">
            <button
              :disabled="!canAccess"
              class="btn btn-success"
              type="button"
              @click="createStepComment"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div
          class="flex-grow-1 text-start pt-1"
          style="font-size: 0.8rem;"
        >
          작성자: {{ recipeDetail.uid }}
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
                    class="modal-title fs-5"
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
                <div class="modal-body">
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
                    type="button"
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
      <hr class="mt-2">
      <div class="col-4 text-start fs-4 fw-bold text-success">
        댓글
      </div>
      <div v-if="comments.length === 0">
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
          :disabled="!canAccess"
          class="form-control"
          placeholder="이곳에 댓글을 작성하세요"
          style="height: 100px"
        />
        <label for="commentArea">이곳에 댓글을 작성하세요</label>
      </div>
      <div class="d-grid gap-2 mt-3 mb-4">
        <button
          :disabled="!canAccess"
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
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
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
    this.getUserUID()
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
        const docRef = await addDoc(collection(db, `recipe_post/${this.$route.params.id}/comments`), {
          comment: this.inputComment,
          createdAt: Date.now(),
          userUID: this.userUID
        })
        console.log('Document written with ID: ', docRef.id)
        this.inputComment = ''
        this.$toast.success('댓글을 작성했습니다!', {
          position: 'top-center',
          timeout: 3000
        })
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
    getUserUID () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userUID = user.uid
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
        recipeLikes
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
    }
    // async forkRecipe () {
    //   const docRef = await addDoc(collection(db, 'fork_recipe_post'), {
    //     uid: this.userUID,
    //     recipeName: this.recipeName,
    //     recipeInfo: this.recipeInfo,
    //     recipeDescription: this.recipeDescription,
    //     recipeLikes: [],
    //     recipeImage: this.recipeImage
    //   })
    //   console.log('Document written with ID: ', docRef.id)
    //   this.$toast.success('레시피를 생성했습니다!', {
    //     position: 'top-center',
    //     timeout: 3000
    //   })
    //   this.$router.push('/')
    // }
  }
}
</script>

<style>

</style>
