<template>
  <section class="qala-empty-state">
    <div class="qala-empty-icon">
      <i class="bi bi-calendar-x"></i>
    </div>

    <h3>События не найдены</h3>

    <p>
      Попробуй изменить запрос или выбрать другую категорию.
    </p>

    <button
      type="button"
      class="qala-empty-btn"
      @click="emit('reset')"
    >
      Сбросить фильтры
    </button>
  </section>
</template>

<script setup>
const emit = defineEmits(['reset'])
</script>

<style scoped>
.qala-empty-state {
  min-height: 300px;
  border: 1px dashed #e5e5e5;
  border-radius: 22px;
  background: #fafafa;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 36px 20px;
}

.qala-empty-icon {
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

.qala-empty-state h3 {
  margin: 0 0 7px;
  color: #111;
  font-size: 18px;
  font-weight: 850;
}

.qala-empty-state p {
  max-width: 310px;
  margin: 0 auto 18px;
  color: #777;
  font-size: 14px;
  line-height: 1.45;
}

.qala-empty-btn {
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}
</style>