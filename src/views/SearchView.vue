<template>
  <div class="ig-search-page">
    <div class="ig-search-shell">
      <header class="ig-search-header">
        <h1 class="ig-search-title">Поиск</h1>

        <div class="ig-search-box">
          <i class="bi bi-search ig-search-icon"></i>

          <input
            v-model="searchQuery"
            type="text"
            class="ig-search-input"
            placeholder="Поиск событий, мест и людей"
          />

          <button
            v-if="searchQuery"
            type="button"
            class="ig-search-clear"
            @click="clearSearch"
            aria-label="Очистить поиск"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </header>

      <section class="ig-search-categories">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="ig-search-category"
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </section>

      <section v-if="!searchQuery" class="ig-recent-section">
        <div class="ig-section-head">
          <h2>Недавние</h2>

          <button type="button" class="ig-clear-btn" @click="recentSearches = []">
            Очистить всё
          </button>
        </div>

        <div v-if="recentSearches.length" class="ig-recent-list">
          <button
            v-for="item in recentSearches"
            :key="item"
            type="button"
            class="ig-recent-item"
            @click="searchQuery = item"
          >
            <span class="ig-recent-icon">
              <i class="bi bi-clock-history"></i>
            </span>

            <span class="ig-recent-text">{{ item }}</span>

            <span class="ig-recent-arrow">
              <i class="bi bi-arrow-up-left"></i>
            </span>
          </button>
        </div>

        <div v-else class="ig-empty-state">
          <div class="ig-empty-icon">
            <i class="bi bi-search"></i>
          </div>

          <h3>История поиска пуста</h3>
          <p>Когда ты начнёшь искать события, они появятся здесь.</p>
        </div>
      </section>

      <section class="ig-results-section">
        <div class="ig-section-head">
          <h2>
            {{ searchQuery ? 'Результаты' : 'Популярное рядом' }}
          </h2>

          <span class="ig-results-count">
            {{ filteredEvents.length }} найдено
          </span>
        </div>

        <div v-if="filteredEvents.length" class="ig-results-grid">
          <RouterLink
            v-for="event in filteredEvents"
            :key="event.id"
            :to="`/events/${event.id}`"
            class="ig-result-card"
          >
            <div class="ig-result-image-wrap">
              <img
                :src="event.image"
                :alt="event.title"
                class="ig-result-image"
              />

              <span class="ig-result-badge">
                {{ event.category }}
              </span>
            </div>

            <div class="ig-result-body">
              <h3>{{ event.title }}</h3>

              <p class="ig-result-location">
                <i class="bi bi-geo-alt"></i>
                {{ event.location }}
              </p>

              <div class="ig-result-meta">
                <span>
                  <i class="bi bi-calendar-event"></i>
                  {{ event.date }}
                </span>

                <span>
                  <i class="bi bi-people"></i>
                  {{ event.people }}
                </span>
              </div>
            </div>
          </RouterLink>
        </div>

        <div v-else class="ig-empty-state">
          <div class="ig-empty-icon">
            <i class="bi bi-emoji-neutral"></i>
          </div>

          <h3>Ничего не найдено</h3>
          <p>Попробуй изменить запрос или выбрать другую категорию.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('')
const activeCategory = ref('Все')

const categories = [
  'Все',
  'Концерты',
  'Образование',
  'Спорт',
  'Бизнес',
  'Выставки',
  'Бесплатно',
]

const recentSearches = ref([
  'Концерт в Караганде',
  'IT meetup',
  'Выставка',
  'Бесплатные события',
])

const events = ref([
  {
    id: 1,
    title: 'Музыкальный вечер Qala Live',
    category: 'Концерты',
    location: 'Караганда, Центральный парк',
    date: '25 мая',
    people: '1.2K',
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Frontend Meetup Karaganda',
    category: 'Образование',
    location: 'IT Hub Karaganda',
    date: '28 мая',
    people: '430',
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Городской забег',
    category: 'Спорт',
    location: 'Набережная',
    date: '1 июня',
    people: '860',
    image:
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Startup Talks',
    category: 'Бизнес',
    location: 'Qala Business Center',
    date: '4 июня',
    people: '250',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Арт-выставка молодых художников',
    category: 'Выставки',
    location: 'Галерея современного искусства',
    date: '7 июня',
    people: '640',
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Бесплатный мастер-класс по дизайну',
    category: 'Бесплатно',
    location: 'Creative Space',
    date: '10 июня',
    people: '310',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
  },
])

const filteredEvents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return events.value.filter((event) => {
    const matchesCategory =
      activeCategory.value === 'Все' || event.category === activeCategory.value

    const matchesQuery =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)

    return matchesCategory && matchesQuery
  })
})

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<style scoped>
.ig-search-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.ig-search-shell {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 28px 32px 48px;
}

.ig-search-header {
  margin-bottom: 18px;
}

.ig-search-title {
  margin: 0 0 18px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #050505;
}

.ig-search-box {
  position: relative;
  height: 48px;
  border-radius: 14px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.ig-search-icon {
  position: absolute;
  left: 17px;
  color: #8e8e8e;
  font-size: 17px;
}

.ig-search-input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  padding: 0 48px 0 46px;
  color: #111;
  font-size: 15px;
}

.ig-search-input::placeholder {
  color: #8e8e8e;
}

.ig-search-clear {
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

.ig-search-categories {
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding: 2px 0 20px;
  margin-bottom: 6px;
  scrollbar-width: none;
}

.ig-search-categories::-webkit-scrollbar {
  display: none;
}

.ig-search-category {
  flex: 0 0 auto;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #ececec;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.ig-search-category.active {
  border-color: #111;
  background: #111;
  color: #fff;
}

.ig-recent-section {
  margin-bottom: 30px;
}

.ig-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.ig-section-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.ig-clear-btn {
  border: 0;
  background: transparent;
  padding: 0;
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
}

.ig-results-count {
  color: #8e8e8e;
  font-size: 13px;
  font-weight: 600;
}

.ig-recent-list {
  display: grid;
  gap: 4px;
}

.ig-recent-item {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #111;
  display: grid;
  grid-template-columns: 42px 1fr 32px;
  align-items: center;
  text-align: left;
}

.ig-recent-item:hover {
  background: #f8f8f8;
}

.ig-recent-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #8e8e8e;
  font-size: 18px;
}

.ig-recent-text {
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ig-recent-arrow {
  color: #a3a3a3;
  font-size: 16px;
  display: grid;
  place-items: center;
}

.ig-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.ig-result-card {
  min-width: 0;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.ig-result-card:hover {
  transform: translateY(-2px);
  border-color: #e4e4e4;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.07);
  color: inherit;
}

.ig-result-image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  background: #f3f4f6;
  overflow: hidden;
}

.ig-result-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ig-result-badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  height: 28px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 800;
  backdrop-filter: blur(10px);
}

.ig-result-body {
  padding: 14px 14px 15px;
}

.ig-result-body h3 {
  margin: 0 0 8px;
  color: #111;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.ig-result-location {
  margin: 0 0 11px;
  color: #707070;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.ig-result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #555;
  font-size: 12px;
  font-weight: 700;
}

.ig-result-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

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

/* LARGE DESKTOP / 4K */
@media (min-width: 1800px) {
  .ig-search-shell {
    max-width: 1640px;
  }
}

/* ULTRA WIDE / 8K */
@media (min-width: 2400px) {
  .ig-search-shell {
    max-width: 1760px;
  }
}

/* TABLET */
@media (min-width: 861px) and (max-width: 1199px) {
  .ig-search-shell {
    padding: 24px 24px 48px;
  }

  .ig-results-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* MOBILE */
@media (max-width: 860px) {
  .ig-search-shell {
    max-width: none;
    padding: 18px 14px 82px;
  }

  .ig-search-title {
    font-size: 24px;
    margin-bottom: 14px;
  }

  .ig-search-box {
    height: 46px;
    border-radius: 13px;
  }

  .ig-results-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .ig-result-card:hover {
    transform: none;
    box-shadow: none;
  }
}

@media (max-width: 420px) {
  .ig-search-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .ig-section-head {
    align-items: flex-end;
  }

  .ig-results-count {
    white-space: nowrap;
  }
}
</style>