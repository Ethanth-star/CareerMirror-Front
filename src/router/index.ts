import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StudentHomeView from '../views/StudentHomeView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import { normalizeHomePathByRole, useUserStore } from '../stores/user'

const WHITE_LIST = ['/login']

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/student/home',
      component: StudentHomeView,
    },
    {
      path: '/admin/dashboard',
      component: AdminDashboardView,
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const hasToken = Boolean(userStore.token)

  if (hasToken && to.path === '/login') {
    return normalizeHomePathByRole(userStore.role)
  }

  if (!WHITE_LIST.includes(to.path) && !hasToken) {
    return '/login'
  }

  return true
})

export default router
