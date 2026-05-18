<template>
  <section class="qala-category-list">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="qala-category-btn"
      :class="{ active: modelValue === category }"
      @click="emit('update:modelValue', category)"
    >
      {{ category }}
    </button>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.qala-category-list {
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding: 2px 0 18px;
  scrollbar-width: none;
}

.qala-category-list::-webkit-scrollbar {
  display: none;
}

.qala-category-btn {
  flex: 0 0 auto;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #ececec;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.qala-category-btn.active {
  border-color: #111;
  background: #111;
  color: #fff;
}
</style>