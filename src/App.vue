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

/* ВАЖНО: теперь контент всегда отступает только на закрытый sidebar */
.ig-main {
  margin-left: 72px;
  min-height: 100vh;
}

@media (max-width: 860px) {
  .ig-main {
    margin-left: 0;
    padding-bottom: 56px;
    width: 100%;
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