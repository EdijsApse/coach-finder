<template>
  <base-container class="mt-header-height page">
    
    <transition name="fade-in">
      <base-loader v-if="loading"></base-loader>
    </transition>

    <transition name="fade-in">
      <div v-if="coach">
        <base-card class="coach-page-header">
          <div class="image">
            <img src="../../assets/temp-img.jpg" :alt="coach.jobtitle" />
          </div>
          <div class="details">
            <h1>{{ coach.user.name }} | <b>{{ coach.jobtitle }}</b></h1>
            <div class="tags mb-4">
              <base-tag v-for="(field, index) in coach.fields" :key="index">{{ field }}</base-tag>
            </div>

            <div class="badges">
              <base-badge class="mb-4 single-badge" :icon-classes="'fa-solid fa-location-dot'">Provides coaching in: <b>{{ coach.location }}</b></base-badge>
              <base-badge class="mb-4 single-badge" :icon-classes="'fa-solid fa-coins'">Asking price: <b>{{ coach.price }} EUR / Hour</b></base-badge>
              <base-badge class="single-badge" :icon-classes="'fa-solid fa-calendar-day'">Member Since: <b>{{ coach.member_since }}</b></base-badge>
            </div>

          </div>
        </base-card>
        <base-card class="info-container" v-if="coach.about">
          <h2>About me</h2>
          <p>{{ coach.about }}</p>
        </base-card>
        <base-button class="mt-8" @click="showMessageModal = true">Send message</base-button>
        <teleport to="html">
          <send-message-modal v-if="showMessageModal" @close-modal="showMessageModal = false" :coachId="coach.id"></send-message-modal>
        </teleport>
      </div>
    </transition>
  </base-container>
</template>

<script>
  import SendMessageModal from '../../components/SendMessageModal.vue';
  import axios from '../../axios';
  import { mapActions } from 'vuex';

  export default {
    components: {
      SendMessageModal
    },
    props: ['coachId'],
    data() {
      return {
        loading: true,
        showMessageModal: false,
        coach: null
      }
    },
    mounted() {
      this.loadCoach();
    },
    methods: {
      ...mapActions(['addErrorMessage']),
      loadCoach() {
        this.loading = true;
        axios.get(`/coaches/${this.coachId}`).then(res => {
          console.log(res)
          const { coach, success, message } = res.data;
          if (success === true) {
            this.coach = coach;
          } else if (success === false) {
            this.addErrorMessage(message);
            this.$router.push({name: 'CoachListPage'});
          }
        })
        .catch(() => {
          this.addErrorMessage('Couldnt find coach!');
          this.$router.push({name: 'CoachListPage'});
        })
        .finally(() => {
          this.loading = false;
        });
      }
    }
  }
</script>

<style scoped>
  .coach-page-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--space-8);
  }

  .coach-page-header .image {
    width: 15rem;
    height: 15rem;
    border-radius: 15rem;
    max-width: 15rem;
    max-height: 15rem;
    overflow: hidden;
  }

  .coach-page-header .image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    margin-top: var(--space-8);
  }

  .details h1 {
    font-size: 2rem;
  }
  .details h1 b {
    font-weight: var(--font-weight-bold);
  }

  .details .tags {
    display: flex;
    justify-content: center;
    margin: var(--space-4) 0;
    gap: 0 var(--space-2);
  }

  h2 {
    font-size: 1.6rem;
    font-weight: var(--font-weight-light);
    margin-bottom: var(--space-6);
  }

  h2:after {
    display: block;
    content: "";
    background-color: var(--color-cloud-blue);
    height: 3px;
    border-radius: 3px;
    width: 5rem;
    margin-top: var(--space-2);
  }

  .info-container p {
    line-height: 1.3;
    font-size: 1.1rem;
  }

  .single-badge b {
    font-weight: var(--font-weight-bold);
  }
</style>