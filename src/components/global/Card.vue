<template>
  <RouterLink
    :to="eventLink"
    class="qala-event-card"
    :aria-label="cardAriaLabel"
  >
    <div class="qala-event-media">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt"
        class="qala-event-image"
        loading="lazy"
        decoding="async"
      />

      <div
        v-else
        class="qala-event-image qala-event-image-placeholder"
        aria-hidden="true"
      >
        <i class="bi bi-image"></i>
      </div>

      <span
        v-if="category"
        class="qala-event-category"
      >
        {{ category }}
      </span>

      <button
        type="button"
        class="qala-save-btn"
        :class="{ 'is-saved': saved }"
        :aria-label="saveButtonLabel"
        :aria-pressed="saved"
        @click.prevent.stop="handleToggleSave"
      >
        <i
          class="bi"
          :class="saveIconClass"
          aria-hidden="true"
        ></i>
      </button>
    </div>

    <div class="qala-event-body">
      <time
        class="qala-event-date"
        :datetime="dateTimeValue"
      >
        <span>{{ day }}</span>
        <small>{{ month }}</small>
      </time>

      <div class="qala-event-info">
        <h2 class="qala-event-title">
          {{ title }}
        </h2>

        <p
          v-if="location"
          class="qala-event-location"
        >
          <i
            class="bi bi-geo-alt"
            aria-hidden="true"
          ></i>
          <span>{{ location }}</span>
        </p>

        <div class="qala-event-meta">
          <span v-if="time">
            <i
              class="bi bi-clock"
              aria-hidden="true"
            ></i>
            {{ time }}
          </span>

          <span v-if="people">
            <i
              class="bi bi-people"
              aria-hidden="true"
            ></i>
            {{ people }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
    validator(value) {
      return Boolean(value && value.id)
    },
  },

  saved: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'toggle-save': id => Boolean(id),
})

const eventId = computed(() => props.event.id)

const eventLink = computed(() => ({
  name: 'event',
  params: {
    id: eventId.value,
  },
}))

const title = computed(() => props.event.title || 'Без названия')
const category = computed(() => props.event.category || '')
const imageSrc = computed(() => props.event.image || '')
const location = computed(() => props.event.location || '')
const time = computed(() => props.event.time || '')
const people = computed(() => props.event.people || '')
const day = computed(() => props.event.day || '--')
const month = computed(() => props.event.month || '')

const dateTimeValue = computed(() => {
  return props.event.date || ''
})

const imageAlt = computed(() => {
  return imageSrc.value ? title.value : ''
})

const cardAriaLabel = computed(() => {
  return `Открыть событие: ${title.value}`
})

const saveButtonLabel = computed(() => {
  return props.saved
    ? 'Убрать событие из сохранённых'
    : 'Сохранить событие'
})

const saveIconClass = computed(() => {
  return props.saved ? 'bi-bookmark-fill' : 'bi-bookmark'
})

function handleToggleSave() {
  emit('toggle-save', eventId.value)
}
</script>

<style scoped>
.qala-event-card {
  --card-radius: 20px;
  --card-border: #eeeeee;
  --card-border-hover: #e3e3e3;
  --card-text: #111111;
  --card-muted: #707070;
  --card-soft: #f7f7f7;
  --card-media-bg: #f3f4f6;
  --card-shadow: 0 16px 34px rgba(0, 0, 0, 0.075);
  --glass-bg: rgba(255, 255, 255, 0.92);

  display: block;
  min-width: 0;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.qala-event-card:hover {
  color: inherit;
  border-color: var(--card-border-hover);
  box-shadow: var(--card-shadow);
  transform: translateY(-2px);
}

.qala-event-card:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  outline-offset: 3px;
}

.qala-event-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--card-media-bg);
}

.qala-event-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qala-event-image-placeholder {
  display: grid;
  place-items: center;
  color: #a3a3a3;
  font-size: 32px;
}

.qala-event-category {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  max-width: calc(100% - 72px);
  height: 29px;
  padding: 0 11px;
  overflow: hidden;
  color: var(--card-text);
  font-size: 12px;
  font-weight: 850;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: var(--glass-bg);
  border-radius: 999px;
  backdrop-filter: blur(10px);
}

.qala-save-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  color: var(--card-text);
  font-size: 18px;
  line-height: 1;
  background: var(--glass-bg);
  border: 0;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  transition:
    transform 0.14s ease,
    background-color 0.14s ease,
    color 0.14s ease;
}

.qala-save-btn:hover {
  background: #ffffff;
  transform: scale(1.04);
}

.qala-save-btn:active {
  transform: scale(0.96);
}

.qala-save-btn:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  outline-offset: 2px;
}

.qala-save-btn.is-saved {
  color: #111111;
}

.qala-event-body {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 13px;
  padding: 15px;
}

.qala-event-date {
  display: grid;
  place-items: center;
  align-content: center;
  width: 54px;
  height: 58px;
  text-decoration: none;
  background: var(--card-soft);
  border-radius: 16px;
}

.qala-event-date span {
  color: var(--card-text);
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
}

.qala-event-date small {
  margin-top: 4px;
  color: #737373;
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.qala-event-info {
  min-width: 0;
}

.qala-event-title {
  display: -webkit-box;
  margin: 0 0 8px;
  overflow: hidden;
  color: var(--card-text);
  font-size: 16px;
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: -0.025em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.qala-event-location {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  margin: 0 0 11px;
  color: var(--card-muted);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
}

.qala-event-location span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qala-event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  color: #555555;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
}

.qala-event-meta span {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  gap: 5px;
}

.qala-event-meta i,
.qala-event-location i {
  flex: 0 0 auto;
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .qala-event-card,
  .qala-save-btn {
    transition: none;
  }
}

@media (hover: none) {
  .qala-event-card:hover {
    border-color: var(--card-border);
    box-shadow: none;
    transform: none;
  }

  .qala-save-btn:hover {
    transform: none;
  }
}

@media (max-width: 860px) {
  .qala-event-card {
    --card-radius: 18px;
  }
}

@media (max-width: 420px) {
  .qala-event-media {
    aspect-ratio: 16 / 11;
  }

  .qala-event-body {
    grid-template-columns: 50px minmax(0, 1fr);
    gap: 12px;
    padding: 13px;
  }

  .qala-event-date {
    width: 50px;
    height: 55px;
    border-radius: 15px;
  }

  .qala-event-date span {
    font-size: 19px;
  }

  .qala-event-title {
    margin-bottom: 7px;
    font-size: 15px;
  }

  .qala-event-location {
    margin-bottom: 10px;
    font-size: 12.5px;
  }

  .qala-event-meta {
    font-size: 11.5px;
  }
}
</style>