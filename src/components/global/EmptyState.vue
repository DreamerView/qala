<template>
  <section
    class="empty-state"
    :class="emptyStateClasses"
    :aria-label="title"
  >
    <div class="empty-state-content">
      <div
        v-if="icon"
        class="empty-state-icon"
        aria-hidden="true"
      >
        <i :class="icon"></i>
      </div>

      <h3 class="empty-state-title">
        <slot name="title">
          {{ title }}
        </slot>
      </h3>

      <p
        v-if="text || $slots.default"
        class="empty-state-text"
      >
        <slot>
          {{ text }}
        </slot>
      </p>

      <div
        v-if="buttonText || $slots.action"
        class="empty-state-actions"
      >
        <slot name="action">
          <button
            type="button"
            class="empty-state-btn"
            @click="handleAction"
          >
            {{ buttonText }}
          </button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value),
  },
  variant: {
    type: String,
    default: 'soft',
    validator: value => ['soft', 'plain', 'outlined'].includes(value),
  },
})

const emit = defineEmits({
  action: null,
})

const emptyStateClasses = computed(() => [
  `empty-state--${props.size}`,
  `empty-state--${props.variant}`,
])

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
.empty-state {
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  border-radius: 22px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.empty-state--soft {
  border: 1px dashed #e5e5e5;
  background: #fafafa;
}

.empty-state--plain {
  border: 1px solid transparent;
  background: transparent;
}

.empty-state--outlined {
  border: 1px solid #efefef;
  background: #fff;
}

.empty-state--sm {
  min-height: 220px;
  padding: 28px 18px;
}

.empty-state--md {
  min-height: 300px;
  padding: 36px 20px;
}

.empty-state--lg {
  min-height: 420px;
  padding: 52px 24px;
}

.empty-state-content {
  width: 100%;
  max-width: 360px;
}

.empty-state-icon {
  width: 58px;
  height: 58px;
  margin: 0 auto 14px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 25px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.empty-state-title {
  margin: 0 0 7px;
  color: #111;
  font-size: 18px;
  font-weight: 850;
  line-height: 1.25;
}

.empty-state-text {
  max-width: 310px;
  margin: 0 auto;
  color: #777;
  font-size: 14px;
  line-height: 1.45;
}

.empty-state-actions {
  margin-top: 18px;
}

.empty-state-btn {
  min-width: 112px;
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease,
    background-color 0.15s ease;
}

.empty-state-btn:hover {
  background: #222;
}

.empty-state-btn:active {
  transform: scale(0.98);
}

.empty-state-btn:focus-visible {
  outline: 3px solid rgba(17, 17, 17, 0.2);
  outline-offset: 3px;
}

@media (max-width: 576px) {
  .empty-state {
    border-radius: 18px;
  }

  .empty-state--sm,
  .empty-state--md,
  .empty-state--lg {
    min-height: 240px;
    padding: 30px 18px;
  }

  .empty-state-icon {
    width: 54px;
    height: 54px;
    font-size: 23px;
  }

  .empty-state-title {
    font-size: 17px;
  }

  .empty-state-text {
    max-width: 280px;
    font-size: 13.5px;
  }

  .empty-state-btn {
    width: 100%;
    max-width: 240px;
  }
}
</style>