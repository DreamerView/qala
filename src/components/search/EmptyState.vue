<template>
  <div class="ig-empty-state">
    <div class="ig-empty-icon">
      <i :class="icon"></i>
    </div>

    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'bi bi-search',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.ig-empty-state {
  min-height: 210px;
  border: 1px dashed #e5e5e5;
  border-radius: 18px;
  background: #fafafa;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 32px 20px;
}

.ig-empty-icon {
  width: 54px;
  height: 54px;
  margin: 0 auto 14px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: grid;
  place-items: center;
  font-size: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.ig-empty-state h3 {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 800;
}

.ig-empty-state p {
  max-width: 300px;
  margin: 0 auto;
  color: #777;
  font-size: 14px;
  line-height: 1.45;
}
</style>