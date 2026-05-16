<template>
  <div class="ig-floating-chat">
    <div class="position-relative">
      <SvgIcon name="send" />

      <span class="ig-chat-badge">
        5
      </span>
    </div>

    <strong>Сообщения</strong>

    <div class="ig-chat-users">
      <img
        v-for="avatar in avatars"
        :key="avatar"
        :src="avatar"
        alt="chat user"
      />
    </div>

    <button class="ig-chat-more">
      <SvgIcon name="more" />
    </button>
  </div>
</template>

<script setup>
import SvgIcon from './SvgIcon.vue'

defineProps({
  avatars: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.ig-floating-chat {
  position: fixed;
  right: 48px;
  bottom: 25px;
  height: 58px;
  padding: 0 15px 0 18px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  gap: 9px;
  z-index: 100;
  font-size: 16px;
}

.ig-floating-chat :deep(.svg-icon) {
  font-size: 24px;
}

.ig-chat-badge {
  position: absolute;
  right: -8px;
  top: -7px;
  min-width: 21px;
  height: 21px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff3040;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.ig-chat-users {
  display: flex;
  align-items: center;
}

.ig-chat-users img {
  width: 26px;
  height: 26px;
  margin-left: -7px;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
}

.ig-chat-users img:first-child {
  margin-left: 0;
}

.ig-chat-more {
  width: 27px;
  height: 27px;
  border: 0;
  padding: 0;
  border-radius: 50%;
  background: #f3f3f3;
  display: grid;
  place-items: center;
  color: #111;
  font-size: 16px;
}

@media (max-width: 1180px) {
  .ig-floating-chat {
    display: none;
  }
}
</style>