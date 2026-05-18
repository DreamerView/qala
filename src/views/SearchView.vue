<template>
  <div class="ig-search-page">
    <div class="ig-search-shell">
      <header class="ig-search-header">
        <HeaderBlock title="Поиск" />

        <SearchBox
          v-model="searchQuery"
          placeholder="Поиск событий, мест и людей"
          @clear="clearSearch"
        />
      </header>

      <CategoryList 
        v-model="activeCategory"
        :categories="categories"
      />

      <section v-if="!searchQuery" class="ig-recent-section">
        <SectionHeader title="Недавние">
          <template #right>
            <button
              type="button"
              class="ig-clear-btn"
              @click="clearRecentSearches"
            >
              Очистить всё
            </button>
          </template>
        </SectionHeader>

        <RecentSearchList
          v-if="recentSearches.length"
          :items="recentSearches"
          @select="selectRecentSearch"
        />
      </section>

      <section class="ig-results-section">
        <SectionHeader :title="searchQuery ? 'Результаты' : 'Популярное рядом'">
          <template #right>
            <span class="ig-results-count">
              {{ filteredEvents.length }} найдено
            </span>
          </template>
        </SectionHeader>

        <div v-if="filteredEvents.length" class="ig-results-grid">
          <Card 
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <EmptyState
          v-else
          icon="bi bi-search"
          title="История поиска пуста"
          text="Когда ты начнёшь искать события, они появятся здесь."
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import SearchBox from '@/components/search/SearchBox.vue'
import SectionHeader from '@/components/search/SectionHeader.vue'
import EmptyState from '@/components/global/EmptyState.vue'
import RecentSearchList from '@/components/search/RecentSearchList.vue'
import Card from '../components/global/Card.vue'
import CategoryList from '../components/global/CategoryList.vue'
import HeaderBlock from '../components/global/HeaderBlock.vue'

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

const clearRecentSearches = () => {
  recentSearches.value = []
}

const selectRecentSearch = (item) => {
  searchQuery.value = item
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

.ig-recent-section {
  margin-bottom: 30px;
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

.ig-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
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

  .ig-results-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

@media (max-width: 420px) {
  .ig-search-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .ig-results-count {
    white-space: nowrap;
  }
}
</style>