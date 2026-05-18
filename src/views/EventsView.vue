<template>
  <div class="qala-events-page">
    <div class="qala-events-shell">
      <EventsHeader
        title="EventGO"
        subtitle="Найди интересные мероприятия рядом с собой"
      />

      <section class="qala-events-tools">
        <EventsSearch
          v-model="searchQuery"
          placeholder="Поиск по событиям"
        />

        <EventsSortDropdown
          v-model="selectedSort"
          :options="sortOptions"
        />
      </section>

      <CategoryList
        v-model="selectedCategory"
        :categories="categories"
      />

      <EventsSummary
        :count="filteredEvents.length"
        :has-filters="Boolean(hasFilters)"
        @reset="resetFilters"
      />

      <section v-if="filteredEvents.length" class="qala-events-grid">
        <Card
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          :saved="isSaved(event.id)"
          @toggle-save="toggleSaved"
        />
      </section>

      <EventsEmptyState
        v-else
        @reset="resetFilters"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import EventsHeader from '@/components/events/EventsHeader.vue'
import EventsSearch from '@/components/events/EventsSearch.vue'
import EventsSortDropdown from '@/components/events/EventsSortDropdown.vue'
import CategoryList from '@/components/global/CategoryList.vue'
import EventsSummary from '@/components/events/EventsSummary.vue'
import Card from '@/components/global/Card.vue'
import EventsEmptyState from '@/components/events/EventsEmptyState.vue'

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

.qala-events-tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}

.qala-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
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

  .qala-events-tools {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .qala-events-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

@media (max-width: 420px) {
  .qala-events-shell {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>