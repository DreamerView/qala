<template>
  <header
    class="header-block"
    :class="[
      `header-block-${size}`,
      {
        'has-subtitle': subtitle,
      },
    ]"
  >
    <div class="header-block-content">
      <component
        :is="titleTag"
        class="header-block-title"
      >
        {{ title }}
      </component>

      <p
        v-if="subtitle"
        class="header-block-subtitle"
      >
        {{ subtitle }}
      </p>
    </div>

    <div
      v-if="$slots.right || actionTo || actionText"
      class="header-block-right"
    >
      <slot name="right">
        <RouterLink
          v-if="actionTo"
          :to="actionTo"
          class="header-block-action"
        >
          <i
            v-if="actionIcon"
            :class="actionIcon"
          ></i>

          <span v-if="actionText">
            {{ actionText }}
          </span>
        </RouterLink>

        <button
          v-else
          type="button"
          class="header-block-action"
          @click="emit('action')"
        >
          <i
            v-if="actionIcon"
            :class="actionIcon"
          ></i>

          <span v-if="actionText">
            {{ actionText }}
          </span>
        </button>
      </slot>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'page',
    validator: (value) => ['page', 'section'].includes(value),
  },
  actionTo: {
    type: String,
    default: '',
  },
  actionIcon: {
    type: String,
    default: '',
  },
  actionText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['action'])

const titleTag = computed(() => {
  return props.size === 'section' ? 'h2' : 'h1'
})
</script>

<style scoped>
.header-block {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.header-block-content {
  min-width: 0;
}

.header-block-title {
  margin: 0;
  color: #050505;
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.header-block-subtitle {
  margin: 7px 0 0;
  color: #737373;
  font-size: 15px;
  font-weight: 500;
}

.header-block-right {
  flex-shrink: 0;
}

.header-block-action {
  height: 42px;
  padding: 0 15px;
  border: 1px solid #ececec;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
  cursor: pointer;
}

.header-block-action:hover {
  background: #f7f7f7;
  color: #111;
}

.header-block-page {
  align-items: flex-start;
  margin-bottom: 22px;
}

.header-block-page .header-block-title {
  font-size: 30px;
}

.header-block-section {
  align-items: center;
  margin-bottom: 14px;
}

.header-block-section .header-block-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

@media (max-width: 860px) {
  .header-block-page {
    align-items: center;
    margin-bottom: 18px;
  }

  .header-block-page .header-block-title {
    font-size: 25px;
  }

  .header-block-subtitle {
    font-size: 14px;
  }

  .header-block-action {
    width: 42px;
    padding: 0;
  }

  .header-block-action span {
    display: none;
  }
}

@media (max-width: 420px) {
  .header-block-section {
    align-items: flex-end;
  }
}
</style>