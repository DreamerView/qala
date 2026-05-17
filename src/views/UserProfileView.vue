<template>
  <div class="qala-profile-page">
    <div class="qala-profile-shell">
      <section class="qala-profile-card">
        <div class="qala-profile-cover">
          <div class="qala-profile-cover-glow"></div>
        </div>

        <div class="qala-profile-main">
          <div class="qala-profile-avatar-wrap">
            <img
              :src="profile.avatar"
              :alt="profile.name"
              class="qala-profile-avatar"
            />
          </div>

          <div class="qala-profile-info">
            <div class="qala-profile-head">
              <div>
                <h1>{{ profile.name }}</h1>

                <p>
                  @{{ profile.username }}
                </p>
              </div>

              <div class="qala-profile-actions">
                <button type="button" class="qala-primary-btn">
                  <i class="bi bi-pencil-square"></i>
                  <span>Редактировать</span>
                </button>

                <button type="button" class="qala-icon-btn" aria-label="Настройки">
                  <i class="bi bi-gear"></i>
                </button>
              </div>
            </div>

            <p class="qala-profile-bio">
              {{ profile.bio }}
            </p>

            <div class="qala-profile-meta">
              <span>
                <i class="bi bi-geo-alt"></i>
                {{ profile.city }}
              </span>

              <span>
                <i class="bi bi-calendar3"></i>
                {{ profile.joinedAt }}
              </span>

              <span>
                <i class="bi bi-link-45deg"></i>
                {{ profile.website }}
              </span>
            </div>

            <div class="qala-profile-stats">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="qala-profile-stat"
              >
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="qala-profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="qala-profile-tab"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </section>

      <section v-if="activeItems.length" class="qala-profile-grid">
        <RouterLink
          v-for="event in activeItems"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="qala-profile-event"
        >
          <div class="qala-profile-event-img-wrap">
            <img
              :src="event.image"
              :alt="event.title"
              class="qala-profile-event-img"
            />

            <span class="qala-profile-event-badge">
              {{ event.category }}
            </span>
          </div>

          <div class="qala-profile-event-body">
            <h2>{{ event.title }}</h2>

            <p>
              <i class="bi bi-geo-alt"></i>
              {{ event.location }}
            </p>

            <div class="qala-profile-event-meta">
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
      </section>

      <section v-else class="qala-profile-empty">
        <div class="qala-profile-empty-icon">
          <i :class="emptyState.icon"></i>
        </div>

        <h3>{{ emptyState.title }}</h3>

        <p>{{ emptyState.text }}</p>

        <RouterLink to="/events" class="qala-empty-btn">
          Смотреть события
        </RouterLink>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeTab = ref('events')

const profile = {
  name: 'Темирхан Рустемов',
  username: 'temirkhan.onyx',
  city: 'Караганда, Казахстан',
  joinedAt: 'с мая 2026',
  website: 'qala.kz',
  bio:
    'Люблю городские события, IT-встречи, уютные места и проекты, которые делают жизнь людей проще.',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
}

const stats = [
  {
    label: 'событий',
    value: '12',
  },
  {
    label: 'подписок',
    value: '248',
  },
  {
    label: 'сохранено',
    value: '36',
  },
]

const tabs = [
  {
    label: 'Мои события',
    value: 'events',
    icon: 'bi bi-grid-3x3-gap',
  },
  {
    label: 'Сохранённые',
    value: 'saved',
    icon: 'bi bi-bookmark',
  },
  {
    label: 'Посещённые',
    value: 'visited',
    icon: 'bi bi-check2-circle',
  },
]

const myEvents = [
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
    id: 4,
    title: 'Startup Talks',
    category: 'Бизнес',
    location: 'Qala Business Center',
    date: '4 июня',
    people: '250',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop',
  },
]

const savedEvents = [
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
    id: 5,
    title: 'Арт-выставка молодых художников',
    category: 'Выставки',
    location: 'Галерея современного искусства',
    date: '7 июня',
    people: '640',
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop',
  },
]

const visitedEvents = []

const activeItems = computed(() => {
  if (activeTab.value === 'events') {
    return myEvents
  }

  if (activeTab.value === 'saved') {
    return savedEvents
  }

  return visitedEvents
})

const emptyState = computed(() => {
  if (activeTab.value === 'visited') {
    return {
      icon: 'bi bi-check2-circle',
      title: 'Пока нет посещённых событий',
      text: 'Когда ты отметишь участие или посетишь событие, оно появится здесь.',
    }
  }

  if (activeTab.value === 'saved') {
    return {
      icon: 'bi bi-bookmark',
      title: 'Нет сохранённых событий',
      text: 'Сохраняй интересные мероприятия, чтобы быстро вернуться к ним позже.',
    }
  }

  return {
    icon: 'bi bi-calendar-event',
    title: 'Событий пока нет',
    text: 'Создай или добавь первое событие в свой профиль.',
  }
})
</script>

<style scoped>
.qala-profile-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.qala-profile-shell {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 20px 56px;
}

.qala-profile-card {
  border: 1px solid #eeeeee;
  border-radius: 28px;
  background: #fff;
  overflow: hidden;
  margin-bottom: 18px;
}

.qala-profile-cover {
  position: relative;
  height: 190px;
  background:
    radial-gradient(circle at 20% 25%, rgba(56, 189, 248, 0.45), transparent 30%),
    radial-gradient(circle at 80% 35%, rgba(124, 58, 237, 0.35), transparent 32%),
    radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.28), transparent 35%),
    #f3f4f6;
  overflow: hidden;
}

.qala-profile-cover-glow {
  position: absolute;
  inset: -40%;
  background:
    conic-gradient(
      from 180deg,
      rgba(56, 189, 248, 0.5),
      rgba(37, 99, 235, 0.45),
      rgba(124, 58, 237, 0.45),
      rgba(6, 182, 212, 0.42),
      rgba(56, 189, 248, 0.5)
    );
  filter: blur(45px);
  opacity: 0.55;
}

.qala-profile-main {
  display: grid;
  grid-template-columns: 148px minmax(0, 1fr);
  gap: 22px;
  padding: 0 24px 24px;
}

.qala-profile-avatar-wrap {
  margin-top: -56px;
  position: relative;
  z-index: 2;
}

.qala-profile-avatar {
  width: 132px;
  height: 132px;
  border: 5px solid #fff;
  border-radius: 999px;
  object-fit: cover;
  background: #f3f4f6;
  display: block;
}

.qala-profile-info {
  min-width: 0;
  padding-top: 20px;
}

.qala-profile-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.qala-profile-head h1 {
  margin: 0;
  color: #050505;
  font-size: 30px;
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.qala-profile-head p {
  margin: 5px 0 0;
  color: #737373;
  font-size: 15px;
  font-weight: 650;
}

.qala-profile-actions {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}

.qala-primary-btn {
  height: 40px;
  padding: 0 15px;
  border: 0;
  border-radius: 999px;
  background: #111;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 850;
}

.qala-primary-btn:hover {
  background: #222;
}

.qala-icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: grid;
  place-items: center;
  font-size: 18px;
}

.qala-icon-btn:hover {
  background: #f7f7f7;
}

.qala-profile-bio {
  max-width: 620px;
  margin: 0 0 14px;
  color: #333;
  font-size: 15px;
  line-height: 1.55;
  font-weight: 500;
}

.qala-profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
  color: #707070;
  font-size: 13px;
  font-weight: 650;
}

.qala-profile-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.qala-profile-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.qala-profile-stat {
  min-width: 110px;
  padding: 12px 14px;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  background: #fafafa;
}

.qala-profile-stat strong {
  display: block;
  color: #111;
  font-size: 20px;
  font-weight: 950;
  line-height: 1;
}

.qala-profile-stat span {
  display: block;
  margin-top: 6px;
  color: #737373;
  font-size: 12px;
  font-weight: 750;
}

.qala-profile-tabs {
  height: 54px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 22px;
}

.qala-profile-tab {
  position: relative;
  height: 54px;
  padding: 0 18px;
  border: 0;
  background: transparent;
  color: #737373;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 850;
}

.qala-profile-tab::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: -1px;
  height: 2px;
  border-radius: 999px;
  background: transparent;
}

.qala-profile-tab.active {
  color: #111;
}

.qala-profile-tab.active::after {
  background: #111;
}

.qala-profile-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.qala-profile-event {
  min-width: 0;
  border: 1px solid #eeeeee;
  border-radius: 20px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.qala-profile-event:hover {
  transform: translateY(-2px);
  border-color: #e4e4e4;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.07);
  color: inherit;
}

.qala-profile-event-img-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #f3f4f6;
  overflow: hidden;
}

.qala-profile-event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.qala-profile-event-badge {
  position: absolute;
  left: 11px;
  bottom: 11px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 850;
  backdrop-filter: blur(10px);
}

.qala-profile-event-body {
  padding: 13px;
}

.qala-profile-event-body h2 {
  margin: 0 0 7px;
  color: #111;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

.qala-profile-event-body p {
  margin: 0 0 10px;
  color: #707070;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

.qala-profile-event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  color: #555;
  font-size: 12px;
  font-weight: 750;
}

.qala-profile-event-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.qala-profile-empty {
  min-height: 330px;
  border: 1px dashed #e5e5e5;
  border-radius: 24px;
  background: #fafafa;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
  padding: 36px 20px;
}

.qala-profile-empty-icon {
  width: 62px;
  height: 62px;
  margin-bottom: 15px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  display: grid;
  place-items: center;
  font-size: 27px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.qala-profile-empty h3 {
  margin: 0 0 7px;
  color: #111;
  font-size: 19px;
  font-weight: 900;
}

.qala-profile-empty p {
  max-width: 330px;
  margin: 0 auto 18px;
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}

.qala-empty-btn {
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 850;
}

.qala-empty-btn:hover {
  background: #222;
  color: #fff;
}

@media (max-width: 860px) {
  .qala-profile-shell {
    max-width: 460px;
    padding: 14px 14px 82px;
  }

  .qala-profile-card {
    border-radius: 24px;
  }

  .qala-profile-cover {
    height: 140px;
  }

  .qala-profile-main {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 16px 18px;
  }

  .qala-profile-avatar-wrap {
    margin-top: -48px;
  }

  .qala-profile-avatar {
    width: 104px;
    height: 104px;
    border-width: 4px;
  }

  .qala-profile-info {
    padding-top: 0;
  }

  .qala-profile-head {
    display: block;
  }

  .qala-profile-head h1 {
    font-size: 25px;
  }

  .qala-profile-actions {
    margin-top: 14px;
    width: 100%;
  }

  .qala-primary-btn {
    flex: 1;
    justify-content: center;
  }

  .qala-profile-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .qala-profile-stat {
    min-width: 0;
    padding: 11px 10px;
    text-align: center;
  }

  .qala-profile-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .qala-profile-tabs::-webkit-scrollbar {
    display: none;
  }

  .qala-profile-tab {
    flex: 0 0 auto;
    padding: 0 14px;
  }

  .qala-profile-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .qala-profile-event {
    display: grid;
    grid-template-columns: 118px minmax(0, 1fr);
  }

  .qala-profile-event-img-wrap {
    aspect-ratio: auto;
    height: 100%;
    min-height: 118px;
  }

  .qala-profile-event:hover {
    transform: none;
    box-shadow: none;
  }
}

@media (max-width: 420px) {
  .qala-profile-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .qala-profile-meta {
    display: grid;
    gap: 8px;
  }

  .qala-profile-event {
    grid-template-columns: 104px minmax(0, 1fr);
  }

  .qala-profile-event-img-wrap {
    min-height: 112px;
  }

  .qala-profile-event-body {
    padding: 11px;
  }

  .qala-profile-event-body h2 {
    font-size: 14px;
  }
}
</style>