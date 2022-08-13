<template>
  <base-container class="mt-header-height page">
    <h1 class="page-title">Coaches</h1>
    <base-card class="filters mb-6">
      <div class="filter-wrapper">
        <input placeholder="Search for keywords" v-model="filter.q" />
        <input placeholder="Search by location" v-model="filter.location" />
        <input placeholder="Search by name" v-model="filter.name" />
        <base-button class="clear-filter-btn" v-if="hasFilters" @click="clearFilters">Clear filters</base-button>
      </div>
    </base-card>
    <transition name="fade-in">
      <base-loader v-if="loading"></base-loader>
      <div v-else>
        <ul v-if="coaches.length">
          <coach-item v-for="coach in coaches" :key="coach.id" :coach="coach"></coach-item>
        </ul>
        <base-pagination v-if="hasMorePages" :pages="pages" :currentPage="page" @setPage="setPage"></base-pagination>
        <h2 class="my-6" v-if="!loading && !coaches.length">Couldn't find any coaches</h2>
      </div>
    </transition>
    <router-link v-if="isAuth" :to="{name: 'CoachCreatePage'}" class="btn fixed-bottom">Become a coach</router-link>
  </base-container>
</template>

<script setup>
  import { defineProps, reactive, ref, onMounted, computed, watch } from 'vue';
  import CoachItem from '../../components/CoachItem.vue';
  import axios from '../../axios';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  import _ from 'lodash';

  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  const props = defineProps(['q']);

  const filter = reactive({
    q: props.q ?? '',
    location: route.query.location ?? '',
    name: route.query.name ?? ''
  });

  const loading = ref('');
  const page = ref(route.query.page);
  const pages = ref(0);

  const hasFilters = computed(() => {
    const { q, location, name } = filter;
      
      if (q || location || name) {
        return true;
      }
      
      return false;
  })
  const coaches = computed(() => store.getters.coaches)
  const isAuth = computed(() => store.getters.isAuth)
  const hasMorePages = computed(() => pages.value > 1);

  let debounceFn = _.debounce(search, 500);

  function search() {
    if (filter.q) {
      router.push({ name: 'CoachQueryListPage', params: { q: filter.q }, query: {...filter, page: page.value } })
    } else {
      router.push({ name: 'CoachListPage', query: { page: page.value }});
    }
    loadCoaches();
  }
  
  function clearFilters() {
    filter.q = '';
    filter.location = '';
    filter.name = '';
  }

  function setPage(newPage) {
    page.value = newPage;
    search();
  }

  function loadCoaches() {
    const query = {
      ...filter,
      page: page.value
    };

    loading.value = true;

    axios.get('/coaches', { params: query }).then(res => {
      const { models, meta } = res.data;
      if (models) {
        pages.value = meta.pages;
        store.dispatch('addCoaches', models);
      }
    }).finally(() => {
      loading.value = false;
    })
  }

  watch(filter, () => {
    page.value = 1;
    debounceFn();
  }, { deep: true })

  onMounted(loadCoaches);
</script>

<style scoped>
  .filter-wrapper {
    display: flex;
    gap: var(--space-1) var(--space-4);
  }

  .filter-wrapper input, .filter-wrapper button {
    font-size: 0.8rem;
    padding: var(--space-2) var(--space-4);
    height: 2rem;
    line-height: 1;
    width: auto;
  }
  .fixed-bottom {
    position: fixed;
    bottom: var(--space-8);
    right: var(--space-8);
    z-index: 2;
  }
  h2 {
    font-size: 1.5rem;
    text-align: center;
  }
</style>