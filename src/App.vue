<template>
  <div class="ig-app">
    <InstagramSidebar :menu="menu" />

    <main class="ig-main">
      <div class="ig-shell">
        <section class="ig-feed">
          <StoriesBar :stories="stories" />
          <FeedPost :post="post" />
        </section>

        <RightSidebar
          :profile="profile"
          :suggestions="suggestions"
        />
      </div>
    </main>

    <FloatingChat :avatars="chatAvatars" />
  </div>
</template>

<script setup>
import InstagramSidebar from './components/InstagramSidebar.vue'
import StoriesBar from './components/StoriesBar.vue'
import FeedPost from './components/FeedPost.vue'
import RightSidebar from './components/RightSidebar.vue'
import FloatingChat from './components/FloatingChat.vue'

import {
  menu,
  stories,
  post,
  profile,
  suggestions,
  chatAvatars,
} from './data/instagramData'
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

.ig-shell {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding-top: 24px;
  display: grid;
  grid-template-columns: 620px 300px;
  column-gap: 62px;
  align-items: start;
}

.ig-feed {
  min-width: 0;
}

@media (max-width: 1180px) {
  .ig-shell {
    grid-template-columns: 620px;
    max-width: 620px;
  }
}

@media (max-width: 860px) {
  .ig-main {
    margin-left: 0;
    padding-bottom: 56px;
    width: 100%;
    overflow-x: hidden;
  }

  .ig-shell {
    width: 100%;
    max-width: 460px;
    grid-template-columns: minmax(0, 1fr);
    padding-top: 18px;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
  }

  .ig-feed {
    width: 100%;
    max-width: 460px;
    min-width: 0;
    overflow-x: hidden;
  }
}
</style>