import { createRouter, createWebHistory } from 'vue-router'

import SearchView from '@/views/SearchView.vue'
import EventsView from '@/views/EventsView.vue'
import EventView from '@/views/EventView.vue'
import MapView from '@/views/MapView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import PlusView from '@/views/PlusView.vue'
import NotificationView from '@/views/NotificationView.vue'
import PublicProfileView from '@/views/PublicProfileView.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes = [
  {
    path: '/sign',
    name: 'sign',
    component: SignUpView,
    meta: {
      title: 'Регистрация',
      layout: 'auth',
    },
  },

  {
    path: '/',
    name: 'home',
    component: EventsView,
    meta: {
      title: 'Главная',
      layout: 'app',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      title: 'Поиск',
      layout: 'app',
    },
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView,
    meta: {
      title: 'События',
      layout: 'app',
    },
  },
  {
    path: '/events/:id',
    name: 'event',
    component: EventView,
    meta: {
      title: 'Событие',
      layout: 'app',
    },
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
    meta: {
      title: 'Карта',
      layout: 'app',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfileView,
    meta: {
      title: 'Профиль',
      layout: 'app',
    },
  },
  {
    path: '/create',
    name: 'create',
    component: PlusView,
    meta: {
      title: 'Создать',
      layout: 'app',
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationView,
    meta: {
      title: 'Уведомления',
      layout: 'app',
    },
  },
  {
    path: '/profile/:id',
    name: 'public-profile',
    component: PublicProfileView,
    meta: {
      title: 'Профиль пользователя',
      layout: 'app',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'auto',
    }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — Qala` : 'Qala'

  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  })
})

export default router