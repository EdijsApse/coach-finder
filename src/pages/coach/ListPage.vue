<template>
  <base-container class="mt-header-height page">
    <h1 class="page-title">Coaches</h1>
    <ul>
      <coach-item v-for="coach in coaches" :key="coach.id" v-bind="coach"></coach-item>
    </ul>
  </base-container>
</template>

<script>
  import CoachItem from '../../components/CoachItem.vue';

  export default {
    data() {
      return {
        coaches: [
          {
            id: 'c1',
            name: 'Gatis',
            title: 'WEB Developer mentor',
            location: 'Latvia',
            tags: ['Full Stack Developer', 'Front End developer', 'Back End Developer']
          },
          {
            id: 'c2',
            name: 'Janis',
            title: 'Football coach',
            location: 'Finland',
            tags: ['Football', 'Fitness']
          },
          {
            id: 'c3',
            name: 'Kristaps',
            title: 'Fitness coach',
            location: 'Latvia',
            tags: ['Fitness', 'Health']
          },
        ]
      }
    },
    components: {
      'coach-item': CoachItem,
    }
  }
</script>