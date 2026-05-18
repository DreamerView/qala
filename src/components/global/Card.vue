<template>
  <RouterLink
    :to="`/events/${event.id}`"
    class="qala-event-card"
  >
    <div class="qala-event-image-wrap">
      <img
        :src="event.image"
        :alt="event.title"
        class="qala-event-image"
      />

      <span class="qala-event-category">
        {{ event.category }}
      </span>

      <button
        type="button"
        class="qala-save-btn"
        aria-label="Сохранить событие"
        @click.prevent="emit('toggle-save', event.id)"
      >
        <i
          class="bi"
          :class="saved ? 'bi-bookmark-fill' : 'bi-bookmark'"
        ></i>
      </button>
    </div>

    <div class="qala-event-body">
      <div class="qala-event-date">
        <span>{{ event.day }}</span>
        <small>{{ event.month }}</small>
      </div>

      <div class="qala-event-content">
        <h2>{{ event.title }}</h2>

        <p class="qala-event-location">
          <i class="bi bi-geo-alt"></i>
          {{ event.location }}
        </p>

        <div class="qala-event-meta">
          <span>
            <i class="bi bi-clock"></i>
            {{ event.time }}
          </span>

          <span>
            <i class="bi bi-people"></i>
            {{ event.people }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
  saved: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-save'])
</script>

<style scoped>
.qala-event-card {
  min-width: 0;
  border: 1px solid #eeeeee;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.qala-event-card:hover {
  transform: translateY(-2px);
  border-color: #e3e3e3;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.075);
  color: inherit;
}

.qala-event-image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  background: #f3f4f6;
  overflow: hidden;
}

.qala-event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.qala-event-category {
  position: absolute;
  left: 12px;
  bottom: 12px;
  height: 29px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 850;
  backdrop-filter: blur(10px);
}

.qala-save-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: grid;
  place-items: center;
  font-size: 18px;
  backdrop-filter: blur(10px);
}

.qala-save-btn:hover {
  background: #fff;
}

.qala-event-body {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 13px;
  padding: 15px;
}

.qala-event-date {
  width: 54px;
  height: 58px;
  border-radius: 16px;
  background: #f7f7f7;
  display: grid;
  place-items: center;
  align-content: center;
}

.qala-event-date span {
  color: #111;
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
}

.qala-event-content {
  min-width: 0;
}

.qala-event-content h2 {
  margin: 0 0 8px;
  color: #111;
  font-size: 16px;
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

.qala-event-location {
  margin: 0 0 11px;
  color: #707070;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.qala-event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #555;
  font-size: 12px;
  font-weight: 750;
}

.qala-event-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 860px) {
  .qala-event-card:hover {
    transform: none;
    box-shadow: none;
  }
}

@media (max-width: 420px) {
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

  .qala-event-content h2 {
    font-size: 15px;
  }
}
</style>