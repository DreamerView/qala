<template>
  <div class="qala-events-page">
    <div class="qala-events-shell">
      <header class="qala-events-header">
        <div>
          <h1 class="qala-events-title">EventGO</h1>
          <p class="qala-events-subtitle">
            Найди интересные мероприятия рядом с собой
          </p>
        </div>

        <RouterLink to="/map" class="qala-map-link">
          <i class="bi bi-map"></i>
          <span>Карта</span>
        </RouterLink>
      </header>

      <section class="qala-events-tools">
        <div class="qala-search-box">
          <i class="bi bi-search qala-search-icon"></i>

          <input
            v-model="searchQuery"
            type="text"
            class="qala-search-input"
            placeholder="Поиск по событиям"
          />

          <button
            v-if="searchQuery"
            type="button"
            class="qala-search-clear"
            aria-label="Очистить поиск"
            @click="searchQuery = ''"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>

        <div class="dropdown">
          <button
            class="qala-sort-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-sliders"></i>
            <span>{{ activeSort.label }}</span>
          </button>

          <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="sort in sortOptions" :key="sort.value">
              <button
                type="button"
                class="dropdown-item"
                :class="{ active: activeSort.value === sort.value }"
                @click="selectedSort = sort.value"
              >
                {{ sort.label }}
              </button>
            </li>
          </ul>
        </div>
      </section>

      <section class="qala-category-list">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="qala-category-btn"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </section>

      <section class="qala-events-summary">
        <div>
          <strong>{{ filteredEvents.length }}</strong>
          <span>событий найдено</span>
        </div>

        <button
          v-if="hasFilters"
          type="button"
          class="qala-reset-btn"
          @click="resetFilters"
        >
          Сбросить
        </button>
      </section>

      <section v-if="filteredEvents.length" class="qala-events-grid">
        <RouterLink
          v-for="event in filteredEvents"
          :key="event.id"
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
              @click.prevent="toggleSaved(event.id)"
            >
              <i
                class="bi"
                :class="isSaved(event.id) ? 'bi-bookmark-fill' : 'bi-bookmark'"
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
      </section>

      <section v-else class="qala-empty-state">
        <div class="qala-empty-icon">
          <i class="bi bi-calendar-x"></i>
        </div>

        <h3>События не найдены</h3>
        <p>
          Попробуй изменить запрос или выбрать другую категорию.
        </p>

        <button type="button" class="qala-empty-btn" @click="resetFilters">
          Сбросить фильтры
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('Все')
const selectedSort = ref('popular')
const savedEventIds = ref([2, 5])

const categories = [
  'Все',
  'Концерты',
  'Образование',
  'Спорт',
  'Бизнес',
  'Выставки',
  'Бесплатно',
]

const sortOptions = [
  {
    label: 'Популярные',
    value: 'popular',
  },
  {
    label: 'Сначала новые',
    value: 'newest',
  },
  {
    label: 'Ближайшие',
    value: 'nearest',
  },
]

const events = ref([
  {
    id: 1,
    title: 'Музыкальный вечер Qala Live',
    category: 'Концерты',
    location: 'Караганда, Центральный парк',
    day: '25',
    month: 'МАЙ',
    time: '19:00',
    people: '1.2K',
    popularity: 1200,
    order: 3,
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Frontend Meetup Karaganda',
    category: 'Образование',
    location: 'IT Hub Karaganda',
    day: '28',
    month: 'МАЙ',
    time: '18:30',
    people: '430',
    popularity: 430,
    order: 4,
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Городской забег',
    category: 'Спорт',
    location: 'Набережная',
    day: '01',
    month: 'ИЮН',
    time: '08:00',
    people: '860',
    popularity: 860,
    order: 5,
    image:
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Startup Talks',
    category: 'Бизнес',
    location: 'Qala Business Center',
    day: '04',
    month: 'ИЮН',
    time: '17:00',
    people: '250',
    popularity: 250,
    order: 6,
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Арт-выставка молодых художников',
    category: 'Выставки',
    location: 'Галерея современного искусства',
    day: '07',
    month: 'ИЮН',
    time: '12:00',
    people: '640',
    popularity: 640,
    order: 7,
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Бесплатный мастер-класс по дизайну',
    category: 'Бесплатно',
    location: 'Creative Space',
    day: '10',
    month: 'ИЮН',
    time: '15:00',
    people: '310',
    popularity: 310,
    order: 8,
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
  },
])

const activeSort = computed(() => {
  return sortOptions.find((item) => item.value === selectedSort.value) || sortOptions[0]
})

const hasFilters = computed(() => {
  return searchQuery.value.trim() || selectedCategory.value !== 'Все'
})

const filteredEvents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  const result = events.value.filter((event) => {
    const matchesCategory =
      selectedCategory.value === 'Все' || event.category === selectedCategory.value

    const matchesQuery =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)

    return matchesCategory && matchesQuery
  })

  return [...result].sort((a, b) => {
    if (selectedSort.value === 'popular') {
      return b.popularity - a.popularity
    }

    if (selectedSort.value === 'newest') {
      return b.order - a.order
    }

    if (selectedSort.value === 'nearest') {
      return a.order - b.order
    }

    return 0
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Все'
  selectedSort.value = 'popular'
}

const isSaved = (id) => {
  return savedEventIds.value.includes(id)
}

const toggleSaved = (id) => {
  if (isSaved(id)) {
    savedEventIds.value = savedEventIds.value.filter((eventId) => eventId !== id)
    return
  }

  savedEventIds.value.push(id)
}
</script>

<style scoped>
.qala-events-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.qala-events-shell {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 28px 32px 54px;
}

.qala-events-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.qala-events-title {
  margin: 0;
  color: #050505;
  font-size: 30px;
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.045em;
}

.qala-events-subtitle {
  margin: 7px 0 0;
  color: #737373;
  font-size: 15px;
  font-weight: 500;
}

.qala-map-link {
  height: 42px;
  padding: 0 15px;
  border: 1px solid #ececec;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
}

.qala-map-link:hover {
  background: #f7f7f7;
  color: #111;
}

.qala-events-tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}

.qala-search-box {
  position: relative;
  height: 48px;
  border-radius: 15px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.qala-search-icon {
  position: absolute;
  left: 17px;
  color: #8e8e8e;
  font-size: 17px;
}

.qala-search-input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  padding: 0 48px 0 46px;
  color: #111;
  font-size: 15px;
  font-weight: 500;
}

.qala-search-input::placeholder {
  color: #8e8e8e;
}

.qala-search-clear {
  position: absolute;
  right: 9px;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: #d9d9d9;
  color: #555;
  display: grid;
  place-items: center;
  font-size: 18px;
  line-height: 1;
}

.qala-sort-btn {
  height: 48px;
  padding: 0 15px;
  border: 1px solid #ececec;
  border-radius: 15px;
  background: #fff;
  color: #111;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}

.qala-sort-btn:hover {
  background: #f8f8f8;
}

.dropdown-item {
  font-size: 14px;
  font-weight: 600;
}

.dropdown-item.active {
  background: #111;
  color: #fff;
}

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

.qala-events-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  color: #737373;
  font-size: 14px;
  font-weight: 600;
}

.qala-events-summary strong {
  color: #111;
  margin-right: 4px;
}

.qala-reset-btn {
  border: 0;
  background: transparent;
  padding: 0;
  color: #2563eb;
  font-size: 14px;
  font-weight: 800;
}

.qala-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

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

/* LARGE DESKTOP / 4K */
@media (min-width: 1800px) {
  .qala-events-shell {
    max-width: 1640px;
  }
}

/* ULTRA WIDE / 8K */
@media (min-width: 2400px) {
  .qala-events-shell {
    max-width: 1760px;
  }
}

/* TABLET */
@media (min-width: 861px) and (max-width: 1199px) {
  .qala-events-shell {
    padding: 24px 24px 54px;
  }

  .qala-events-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* MOBILE */
@media (max-width: 860px) {
  .qala-events-shell {
    max-width: none;
    padding: 18px 14px 82px;
  }

  .qala-events-header {
    align-items: center;
    margin-bottom: 18px;
  }

  .qala-events-title {
    font-size: 25px;
  }

  .qala-events-subtitle {
    font-size: 14px;
  }

  .qala-map-link {
    width: 42px;
    padding: 0;
    justify-content: center;
  }

  .qala-map-link span {
    display: none;
  }

  .qala-events-tools {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .qala-sort-btn {
    width: 100%;
    justify-content: center;
  }

  .qala-events-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .qala-event-card:hover {
    transform: none;
    box-shadow: none;
  }
}

@media (max-width: 420px) {
  .qala-events-shell {
    padding-left: 12px;
    padding-right: 12px;
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

  .qala-event-content h2 {
    font-size: 15px;
  }
}
</style>