<template>
  <!-- DESKTOP SIDEBAR -->
  <aside class="ig-sidebar">
    <div class="ig-sidebar-inner">
      <div class="ig-sidebar-top">
        <RouterLink to="/" class="ig-logo" aria-label="Qala">
          <SvgIcon name="instagram" :size="28" />
        </RouterLink>

        <div class="ig-sidebar-body">
          <nav class="ig-menu">
            <RouterLink
              v-for="item in menu"
              :key="item.title"
              :to="item.to || '/'"
              class="ig-menu-item"
              :class="{ active: isActiveRoute(item) }"
            >
              <span class="ig-menu-icon">
                <SvgIcon :name="getMenuIcon(item)" :size="24" />

                <span v-if="item.badge" class="ig-menu-badge">
                  {{ item.badge }}
                </span>
              </span>

              <span class="ig-menu-text">{{ item.title }}</span>
            </RouterLink>
          </nav>
        </div>
      </div>

      <div class="ig-bottom-menu">
        <button class="ig-menu-item" type="button">
          <span class="ig-menu-icon">
            <SvgIcon name="menu" :size="24" />
          </span>

          <span class="ig-menu-text">Ещё</span>
        </button>

        <button class="ig-menu-item" type="button">
          <span class="ig-menu-icon">
            <SvgIcon name="grid" :size="24" />
          </span>

          <span class="ig-menu-text text-truncate">
            Другие продукты ...
          </span>
        </button>
      </div>
    </div>
  </aside>

  <!-- MOBILE BOTTOM NAV -->
  <nav class="ig-mobile-nav">
    <RouterLink
      v-for="item in mobileMenu"
      :key="item.title"
      :to="item.to || '/'"
      class="ig-mobile-nav-item"
      :class="{ active: isActiveRoute(item) }"
      :aria-label="item.title"
    >
      <SvgIcon :name="getMenuIcon(item)" :size="30" />

      <span v-if="item.badge" class="ig-mobile-badge">
        {{ item.badge }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SvgIcon from './SvgIcon.vue'

const route = useRoute()

const props = defineProps({
  menu: {
    type: Array,
    required: true,
  },
})

const isActiveRoute = (item) => {
  if (!item.to) {
    return false
  }

  if (item.exact) {
    return route.path === item.to
  }

  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

const getMenuIcon = (item) => {
  if (isActiveRoute(item) && item.activeIcon) {
    return item.activeIcon
  }

  return item.icon
}

const mobileMenu = computed(() => {
  const order = [
    'home',
    'search',
    'plus',
    'heart',
    'user-circle',
  ]

  return order
    .map((icon) => props.menu.find((item) => item.icon === icon))
    .filter(Boolean)
})
</script>

<style scoped>
/* DESKTOP SIDEBAR */

.ig-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 72px;
  background: #fff;
  z-index: 100;
  overflow: hidden;
  transition: width 0.22s ease;
}

.ig-sidebar:hover {
  width: 220px;
  box-shadow: none;
}

.ig-sidebar-inner {
  width: 220px;
  height: 100%;
  padding: 26px 13px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
}

.ig-sidebar-top {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
}

.ig-logo {
  width: 46px;
  min-width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  color: #111;
  flex-shrink: 0;
  text-decoration: none;
}

.ig-sidebar-body {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.ig-sidebar:hover .ig-sidebar-body {
  scrollbar-color: #cfcfcf transparent;
}

.ig-sidebar-body::-webkit-scrollbar {
  width: 5px;
}

.ig-sidebar-body::-webkit-scrollbar-track {
  background: transparent;
}

.ig-sidebar-body::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 999px;
}

.ig-sidebar:hover .ig-sidebar-body::-webkit-scrollbar-thumb {
  background: #d1d1d1;
}

.ig-sidebar-body::-webkit-scrollbar-thumb:hover {
  background: #b8b8b8;
}

.ig-menu,
.ig-bottom-menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ig-bottom-menu {
  padding-top: 18px;
  flex-shrink: 0;
}

.ig-menu-item {
  width: 100%;
  height: 45px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
  font-size: 16px;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
}

.ig-menu-item:hover {
  background: #f7f7f7;
  color: #000;
}

.ig-menu-item.active {
  font-weight: 700;
}

.ig-menu-icon {
  width: 46px;
  min-width: 46px;
  height: 45px;
  display: grid;
  place-items: center;
  position: relative;
  color: #111;
  flex-shrink: 0;
}

.ig-menu-text {
  opacity: 0;
  transform: translateX(-6px);
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.ig-sidebar:hover .ig-menu-text {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.ig-menu-badge {
  position: absolute;
  right: 4px;
  top: 4px;
  min-width: 19px;
  height: 19px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff3040;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

/* MOBILE BOTTOM NAV */

.ig-mobile-nav {
  display: none;
}

@media (max-height: 760px) {
  .ig-sidebar-inner {
    padding-top: 20px;
    padding-bottom: 18px;
  }

  .ig-logo {
    margin-bottom: 16px;
  }

  .ig-menu,
  .ig-bottom-menu {
    gap: 10px;
  }

  .ig-bottom-menu {
    padding-top: 12px;
  }
}

@media (max-height: 640px) {
  .ig-menu,
  .ig-bottom-menu {
    gap: 6px;
  }

  .ig-menu-item {
    height: 42px;
  }

  .ig-menu-icon {
    height: 42px;
  }
}

/* MOBILE MODE */

@media (max-width: 860px) {
  .ig-sidebar {
    display: none;
  }

  .ig-mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 56px;
    padding: 0;
    background: #fff;
    border-top: 0.1px solid #ededed;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    z-index: 200;
  }

  .ig-mobile-nav-item {
    position: relative;
    width: 100%;
    height: 56px;
    border: 0;
    padding: 0;
    background: transparent;
    color: #111;
    display: grid;
    place-items: center;
    text-decoration: none;
  }

  .ig-mobile-nav-item.active {
    color: #000;
  }

  .ig-mobile-nav-item.active :deep(.svg-icon) {
    transform: scale(1.03);
  }

  .ig-mobile-badge {
    position: absolute;
    top: 9px;
    left: 50%;
    min-width: 18px;
    height: 18px;
    margin-left: 7px;
    padding: 0 5px;
    border-radius: 999px;
    background: #ff3040;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    display: grid;
    place-items: center;
  }
}
</style>