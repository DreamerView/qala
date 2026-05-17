<template>
  <Teleport to="body">
    <QalaMapModal />
  </Teleport>

  <div class="ig-app">
    <InstagramSidebar :menu="menu" />

    <main class="ig-main">
      <RouterView />
    </main>

    <FloatingChat :avatars="chatAvatars" />
  </div>
</template>

<script setup>
import InstagramSidebar from '@/components/InstagramSidebar.vue'
import FloatingChat from '@/components/FloatingChat.vue'
import QalaMapModal from '@/components/modal/QalaMapModal.vue'

import {
  menu,
  chatAvatars,
} from '@/data/instagramData'
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: #fff;
  color: #000;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
}

button {
  font-family: inherit;
}

.ig-app {
  min-height: 100vh;
  background: #fff;
}

/* DESKTOP */
/* Sidebar открыт на 220px, поэтому контент отступает на 220px */
.ig-main {
  min-height: 100vh;
  margin-left: 220px;
  width: calc(100% - 220px);
  overflow-x: clip;
  transition:
    margin-left 0.22s ease,
    width 0.22s ease;
}

/* TABLET */
/* Sidebar закрыт на 72px, hover раскрывается поверх контента */
@media (min-width: 861px) and (max-width: 1199px) {
  .ig-main {
    margin-left: 72px;
    width: calc(100% - 72px);
  }
}

/* MOBILE */
/* Sidebar скрыт, работает нижняя навигация */
@media (max-width: 860px) {
  .ig-main {
    margin-left: 0;
    width: 100%;
    padding-bottom: 56px;
    overflow-x: clip;
  }
}

html,
body,
#app,
.ig-app,
.ig-main {
  scroll-behavior: auto !important;
}
</style>