<template>
  <header class="qala-events-header">
    <div>
      <h1 class="qala-events-title">
        {{ title }}
      </h1>

      <p class="qala-events-subtitle">
        {{ subtitle }}
      </p>
    </div>

    <RouterLink to="/map" class="qala-map-link">
      <i class="bi bi-map"></i>
      <span>Карта</span>
    </RouterLink>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'EventGO',
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
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

@media (max-width: 860px) {
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
}
</style>