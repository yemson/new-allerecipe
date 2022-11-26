import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/recipe-detail/:id',
    name: 'RecipeDetail',
    component: () => import(/* webpackChunkName: "recipe-detail" */ '../views/RecipeDetail.vue')
  },
  {
    path: '/modify-recipe/:id',
    name: 'ModifyRecipe',
    component: () => import(/* webpackChunkName: "modify-recipe" */ '../views/ModifyRecipe.vue')
  },
  {
    path: '/fork-recipe/:id',
    name: 'ForkRecipe',
    component: () => import(/* webpackChunkName: "fork-recipe" */ '../views/ForkRecipe.vue')
  },
  {
    path: '/create-recipe',
    name: 'CreateRecipe',
    component: () => import(/* webpackChunkName: "create-recipe" */ '../views/CreateRecipe.vue')
  },
  {
    path: '/my-page',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "my-page" */ '../views/MyPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
