<template>
  <nav
    class="category-tabs"
    aria-label="Категории"
  >
    <button
      v-for="category in normalizedCategories"
      :key="category.value"
      type="button"
      class="category-tabs__button"
      :class="{ 'category-tabs__button--active': isActive(category.value) }"
      :aria-pressed="isActive(category.value)"
      @click="selectCategory(category.value)"
    >
      {{ category.label }}
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every((item) => {
        if (typeof item === 'string') return true

        return (
          item &&
          typeof item === 'object' &&
          typeof item.value === 'string' &&
          typeof item.label === 'string'
        )
      })
    },
  },
})

const emit = defineEmits({
  'update:modelValue': (value) => typeof value === 'string',
})

const normalizedCategories = computed(() => {
  return props.categories.map((category) => {
    if (typeof category === 'string') {
      return {
        label: category,
        value: category,
      }
    }

    return {
      label: category.label,
      value: category.value,
    }
  })
})

const isActive = (value) => props.modelValue === value

const selectCategory = (value) => {
  if (isActive(value)) return

  emit('update:modelValue', value)
}
</script>

<style scoped>
.category-tabs {
  --tabs-gap: 9px;
  --tabs-padding-bottom: 18px;
  --tab-height: 36px;
  --tab-padding-x: 15px;
  --tab-radius: 999px;
  --tab-border: #ececec;
  --tab-bg: #fff;
  --tab-color: #111;
  --tab-active-bg: #111;
  --tab-active-color: #fff;
  --tab-active-border: #111;

  display: flex;
  gap: var(--tabs-gap);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 0 var(--tabs-padding-bottom);
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tabs__button {
  flex: 0 0 auto;
  min-width: max-content;
  height: var(--tab-height);
  padding: 0 var(--tab-padding-x);
  border: 1px solid var(--tab-border);
  border-radius: var(--tab-radius);
  background: var(--tab-bg);
  color: var(--tab-color);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.category-tabs__button:hover {
  border-color: var(--tab-active-border);
}

.category-tabs__button:active {
  transform: scale(0.97);
}

.category-tabs__button:focus-visible {
  outline: 3px solid rgba(17, 17, 17, 0.18);
  outline-offset: 2px;
}

.category-tabs__button--active {
  border-color: var(--tab-active-border);
  background: var(--tab-active-bg);
  color: var(--tab-active-color);
}

@media (max-width: 576px) {
  .category-tabs {
    --tabs-gap: 8px;
    --tabs-padding-bottom: 14px;
    --tab-height: 34px;
    --tab-padding-x: 13px;
  }

  .category-tabs__button {
    font-size: 13px;
  }
}
</style>