import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Auth from '../views/Auth.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.user.loggedIn) next()
      else next({name: Login})
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children:[
      {
      path: 'login',
      name: 'Login',
      components: {auth: Login}
      },
      {
        path: 'register',
        components: {auth: Register}
      },
  ]
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('../views/Verify.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
