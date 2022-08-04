<template>
<base-container class="mt-header-height page">
  <base-card class="w-max-50 relative">
    <transition name="fade-in">
      <base-loader v-if="loading"></base-loader>
    </transition>
    <h1 class="page-title">Become a coach</h1>
    <form @submit.prevent="createCoach">
      
      <div class="form-control-row">
        <div class="form-control-col">
          <base-form-control :errors="errors" field="jobtitle" id="jobtitle" label="Coach title">
            <input type="text" id="jobtitle" v-model="jobtitle" />
          </base-form-control>
        </div>

        <div class="form-control-col">
          <base-form-control :errors="errors" field="price" id="price" label="Expected price per hour (EUR)">
            <input type="number" step="0.01" id="price" v-model="price" />
          </base-form-control>
        </div>
      </div>

      <div class="form-control-row">
        <div class="form-control-col">
          <base-form-control :errors="errors" field="fields" id="fields" label="Coaching fields">
            <input type="text" id="fields" v-model.trim="fieldValue" @keypress.enter.prevent="addField" placeholder="Enter to confirm..." />
          </base-form-control>
          <div class="tags" v-if="fields.length">
            <base-tag v-for="field in fields" :key="field.id" class="d-inline-block single-field">
              <i class="fa-solid fa-circle-xmark" @click="removeField(field.id)"></i>
              <span>{{ field.value }}</span>
            </base-tag>
          </div>
        </div>
      </div>

      <div class="form-control-row">
        <div class="form-control-col">
          <base-form-control :errors="errors" field="location" id="location" label="Location where coaching is provided">
            <input type="text" id="location" v-model="location" />
          </base-form-control>
        </div>
      </div>

      <div class="form-control-row">
        <div class="form-control-col">
          <base-form-control :errors="errors" field="about" id="about" label="About yourself">
            <textarea id="about" v-model="about"></textarea>
          </base-form-control>
        </div>
      </div>

      <base-button>Create</base-button>
    </form>
  </base-card>
</base-container>
</template>

<script>
import axios from '../../axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      errors: [],
      jobtitle: '',
      price: 0,
      fields: [],
      fieldValue: '',
      location: '',
      about: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['addErrorMessage', 'addSuccessMessage']),
    createCoach() {
      const coach = {
        jobtitle: this.jobtitle,
        price: this.price,
        fields: this.fields.map((field) => field.value),
        location: this.location,
        about: this.about
      };

      this.loading = true;

      this.errors = [];

      axios.post('/coaches/new', coach).then(res => {
        const { success, coach, message, errors } = res.data;
        
        if (success === true) {
          
          this.addSuccessMessage(message);
          this.$router.push({name: 'CoachViewPage', params: { coachId: coach._id }});

        } else if (success === false && errors) {
          this.errors = errors;
        }

      })
      .catch((err) => {
        this.addErrorMessage(err.message);
      })
      .finally(() => {
        this.loading = false;
      })
    },
    removeField(id) {
      this.fields = this.fields.filter(field => field.id !== id);
    },
    addField() {
      if (this.fieldValue) {
        this.fields.push({
          id: Date.now(),
          value: this.fieldValue
        });
        this.fieldValue = '';
      }
    }
  }
}
</script>

<style scoped>
  .form-control-row {
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
  }

  .form-control-col {
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    max-width: 50%;
  }
  
  .w-max-50 {
    max-width: 50rem;
    margin: 0 auto;
  }

  .d-inline-block {
    display: inline-block;
  }

  .tags {
    margin-top: -1rem;
    margin-bottom: var(--space-4);
    display: flex;
    gap: var(--space-2) var(--space-2);
    flex-wrap: wrap;
  }

  .single-field {
    position: relative;
  }

  .single-field span {
    margin-right: 7px;
  }

  .single-field i {
    position: absolute;
    top: 7px;
    right: 4px;
    cursor: pointer;
    color: #FFF;
    font-size: 0.9rem;
    cursor: pointer;
  }

</style>