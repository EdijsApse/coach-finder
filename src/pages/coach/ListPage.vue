<template>
  <base-container class="mt-header-height page">
    <h1 class="page-title">Coaches</h1>
    <base-card class="filters mb-6">
      <div class="filter-wrapper">
        <input placeholder="Search for keywords" v-model="filter.q" />
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
    <router-link :to="{name: 'CoachCreatePage'}" class="btn fixed-bottom">Become a coach</router-link>
  </base-container>
</template>

<script>
  import CoachItem from '../../components/CoachItem.vue';
  import axios from '../../axios';
  import { mapGetters, mapActions } from 'vuex';
  import _ from 'lodash';

  export default {
    props: ['q'],
    data() {
      return {
        loading: false,
        debounceFn: null,
        filter: {
          q: this.q ?? ''
        },
        page: this.$route.query.page ?? 1,
        pages: 0,
      }
    },
    created() {
      this.loadCoaches();
      this.debounceFn = _.debounce(this.search, 500);
    },
    computed: {
      ...mapGetters(['coaches']),
      hasMorePages() {
        return this.pages > 1
      }
    },
    methods: {
      ...mapActions(['addCoaches']),
      setPage(page) {
        this.page = page;
        this.search();
      },
      search() {

        if (this.filter.q) {
          this.$router.push({ name: 'CoachQueryListPage', params: { q: this.filter.q}, query: {q: this.filter.q, page: this.page } })
        } else {
          this.$router.push({ name: 'CoachListPage', query: { page: this.page }});
        }

        this.loadCoaches();
      },

      loadCoaches() {
        const query = {
          q: this.filter.q,
          page: this.page
        };

        this.loading = true;

        axios.get('/coaches', { params: query }).then(res => {
          const { models, meta } = res.data;
          if (models) {
            this.pages = meta.pages;
            this.addCoaches(models);
          }
        }).finally(() => {
          this.loading = false;
        })
      }
    },
    watch: {
      filter: {
        handler() {
          this.page = 1;
          this.debounceFn();
        },
        deep: true
      }
    },
    components: {
      'coach-item': CoachItem,
    }
  }
</script>

<style scoped>
  .filter-wrapper {
    display: flex;
    gap: var(--space-1) var(--space-2);
  }

  .filter-wrapper input, .filter-wrapper button {
    font-size: 0.8rem;
    padding: var(--space-2) var(--space-4);
    height: 2rem;
    line-height: 1;
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