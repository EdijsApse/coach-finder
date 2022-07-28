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
            fullname: 'Test Test',
            contact: 'test@example.com',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 'c1',
            fullname: 'Test Test',
            contact: 'test@example.com',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 'c1',
            fullname: 'Test Test',
            contact: 'test@example.com',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 'c1',
            fullname: 'Test Test',
            contact: 'test@example.com',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 'c1',
            fullname: 'Test Test',
            contact: 'test@example.com',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          }
        ]
      }
    },
    components: {
      'coach-item': CoachItem,
    }
  }
</script>