<template>
  <header
    class="header-block"
    :class="[
      `header-block--${size}`,
      {
        'header-block--with-subtitle': hasSubtitle,
        'header-block--with-action': hasRightContent,
      },
    ]"
  >
    <div class="header-block__main">
      <component
        :is="headingTag"
        class="header-block__title"
      >
        {{ title }}
      </component>

      <p
        v-if="hasSubtitle"
        class="header-block__subtitle"
      >
        {{ subtitle }}
      </p>
    </div>

    <div
      v-if="hasRightContent"
      class="header-block__aside"
    >
      <slot name="right">
        <RouterLink
          v-if="isLinkAction"
          :to="actionTo"
          class="header-block__action"
          :aria-label="actionLabel"
        >
          <i
            v-if="actionIcon"
            :class="actionIcon"
            aria-hidden="true"
          ></i>

          <span v-if="actionText">
            {{ actionText }}
          </span>
        </RouterLink>

        <button
          v-else
          type="button"
          class="header-block__action"
          :disabled="disabled"
          :aria-label="actionLabel"
          @click="handleAction"
        >
          <i
            v-if="actionIcon"
            :class="actionIcon"
            aria-hidden="true"
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
import { computed, useSlots } from 'vue'

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
    type: [String, Object],
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

  actionAriaLabel: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  action: null,
})

const slots = useSlots()

const headingTag = computed(() => {
  return props.size === 'section' ? 'h2' : 'h1'
})

const hasSubtitle = computed(() => {
  return Boolean(props.subtitle?.trim())
})

const hasNamedRightSlot = computed(() => {
  return Boolean(slots.right)
})

const isLinkAction = computed(() => {
  if (typeof props.actionTo === 'string') {
    return Boolean(props.actionTo.trim())
  }

  return Boolean(props.actionTo)
})

const hasDefaultAction = computed(() => {
  return isLinkAction.value || Boolean(props.actionIcon || props.actionText)
})

const hasRightContent = computed(() => {
  return hasNamedRightSlot.value || hasDefaultAction.value
})

const actionLabel = computed(() => {
  return props.actionAriaLabel || props.actionText || props.title
})

function handleAction() {
  if (props.disabled) return

  emit('action')
}
</script>

<style scoped>
.header-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.header-block__main {
  min-width: 0;
}

.header-block__title {
  margin: 0;
  color: #050505;
  font-weight: 850;
  line-height: 1.08;
  letter-spacing: -0.04em;
  overflow-wrap: anywhere;
}

.header-block__subtitle {
  max-width: 720px;
  margin: 7px 0 0;
  color: #737373;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
}

.header-block__aside {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.header-block__action {
  min-width: 42px;
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
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    opacity 0.18s ease;
}

.header-block__action:hover {
  border-color: #e4e4e4;
  background: #f7f7f7;
  color: #111;
}

.header-block__action:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.2);
  outline-offset: 2px;
}

.header-block__action:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.header-block__action i {
  font-size: 16px;
  line-height: 1;
}

.header-block--page {
  align-items: flex-start;
  margin-bottom: 22px;
}

.header-block--page .header-block__title {
  font-size: clamp(25px, 3vw, 30px);
}

.header-block--section {
  align-items: center;
  margin-bottom: 14px;
}

.header-block--section .header-block__title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

@media (max-width: 860px) {
  .header-block {
    gap: 14px;
  }

  .header-block--page {
    align-items: center;
    margin-bottom: 18px;
  }

  .header-block__subtitle {
    font-size: 14px;
  }

  .header-block__action {
    width: 42px;
    padding: 0;
  }

  .header-block__action span {
    display: none;
  }
}

@media (max-width: 520px) {
  .header-block {
    gap: 12px;
  }

  .header-block--section {
    align-items: flex-start;
  }

  .header-block--section .header-block__title {
    font-size: 17px;
  }

  .header-block__subtitle {
    margin-top: 5px;
  }
}

@media (max-width: 380px) {
  .header-block--with-subtitle.header-block--with-action {
    align-items: flex-start;
  }
}
</style>