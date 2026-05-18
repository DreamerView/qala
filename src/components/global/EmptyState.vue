<template>
  <section class="empty-state">
    <div class="empty-state-icon">
      <i :class="icon"></i>
    </div>

    <h3>{{ title }}</h3>

    <p>
      {{ text }}
    </p>

    <button
      v-if="buttonText"
      type="button"
      class="empty-state-btn"
      @click="emit('action')"
    >
      {{ buttonText }}
    </button>
  </section>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'bi bi-inbox',
  },
  title: {
    type: String,
    default: 'Ничего не найдено',
  },
  text: {
    type: String,
    default: 'Попробуй изменить запрос или выбрать другую категорию.',
  },
  buttonText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  min-height: 300px;
  border: 1px dashed #e5e5e5;
  border-radius: 22px;
  background: #fafafa;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 36px 20px;
}

.empty-state-icon {
  width: 58px;
  height: 58px;
  margin: 0 auto 14px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: grid;
  place-items: center;
  font-size: 25px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.empty-state h3 {
  margin: 0 0 7px;
  color: #111;
  font-size: 18px;
  font-weight: 850;
}

.empty-state p {
  max-width: 310px;
  margin: 0 auto 18px;
  color: #777;
  font-size: 14px;
  line-height: 1.45;
}

.empty-state-btn {
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

.empty-state-btn:active {
  transform: scale(0.98);
}
</style>