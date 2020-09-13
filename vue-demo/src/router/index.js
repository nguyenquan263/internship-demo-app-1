import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../views/forClient/RegisterPage.vue'
import Login from '../views/forAdmin/LoginPage.vue'
import Admin from '../views/forAdmin/AdminPage.vue'

import Info from '../components/InfoComponent.vue'
import Something from '../components/SomethingComponent.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'info',
          name: 'InfoComponent',
          component: Info
        },
        {
          path: 'something',
          name: 'SomethingComponent',
          component: Something
        }
      ]
    }
  ]

const router = new VueRouter({
  routes
})

export default router
