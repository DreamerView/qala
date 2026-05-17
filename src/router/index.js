import { createRouter, createWebHistory } from 'vue-router'

import SearchView from '@/views/SearchView.vue'
import EventsView from '@/views/EventsView.vue'
import EventView from '@/views/EventView.vue'
import MapView from '@/views/MapView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import PlusView from '@/views/PlusView.vue'
import NotificationView from '@/views/NotificationView.vue'
import PublicProfileView from '@/views/PublicProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EventsView,
    meta: {
      title: 'Главная',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      title: 'Поиск',
    },
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView,
    meta: {
      title: 'События',
    },
  },
  {
    path: '/events/:id',
    name: 'event',
    component: EventView,
    meta: {
      title: 'Событие',
    },
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
    meta: {
      title: 'Карта',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfileView,
    meta: {
      title: 'Профиль',
    },
  },
  {
    path: '/create',
    name: 'create',
    component: PlusView,
    meta: {
      title: 'Создать',
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationView,
    meta: {
      title: 'Уведомления',
    },
  },
  {
    path: '/profile/:id',
    name: 'public-profile',
    component: PublicProfileView,
    meta: {
      title: 'Профиль пользователя',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // Отключаем стандартное поведение Vue Router,
  // чтобы не было плавного scroll-to-top
  scrollBehavior() {
    return false
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — Qala` : 'Qala'

  // Жёстко поднимаем страницу наверх без анимации
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)

    // На случай если скроллится не window, а html/body
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  })
})

export default router