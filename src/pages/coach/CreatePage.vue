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
            <base-form-control
              :errors="errors"
              field="jobtitle"
              id="jobtitle"
              label="Coach title"
            >
              <input type="text" id="jobtitle" v-model="jobtitle" />
            </base-form-control>
          </div>

          <div class="form-control-col">
            <base-form-control
              :errors="errors"
              field="price"
              id="price"
              label="Expected price per hour (EUR)"
            >
              <input type="number" step="0.01" id="price" v-model="price" />
            </base-form-control>
          </div>
        </div>

        <div class="form-control-row">
          <div class="form-control-col">
            <base-form-control
              :errors="errors"
              field="fields"
              id="fields"
              label="Coaching fields"
            >
              <input
                type="text"
                id="fields"
                v-model.trim="fieldValue"
                @keypress.enter.prevent="addField"
                placeholder="Enter to confirm..."
              />
            </base-form-control>
            <div class="tags" v-if="fields.length">
              <base-tag
                v-for="field in fields"
                :key="field.id"
                class="d-inline-block single-field"
              >
                <i
                  class="fa-solid fa-circle-xmark"
                  @click="removeField(field.id)"
                ></i>
                <span>{{ field.value }}</span>
              </base-tag>
            </div>
          </div>
        </div>

        <div class="form-control-row">
          <div class="form-control-col">
            <base-form-control
              :errors="errors"
              field="location"
              id="location"
              label="Location where coaching is provided"
            >
              <input type="text" id="location" v-model="location" />
            </base-form-control>
          </div>
        </div>

        <div class="form-control-row">
          <div class="form-control-col">
            <base-form-control
              :errors="errors"
              field="about"
              id="about"
              label="About yourself"
            >
              <textarea id="about" v-model="about"></textarea>
            </base-form-control>
          </div>
        </div>

        <base-button>Create</base-button>
      </form>
    </base-card>
  </base-container>
</template>

<script setup>
import axios from "../../axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();

const errors = ref([]);
const jobtitle = ref("");
const price = ref(0);
const fields = ref([]);
const fieldValue = ref("");
const location = ref("");
const about = ref("");
const loading = ref(false);

function createCoach() {
  const coach = {
    jobtitle: jobtitle.value,
    price: price.value,
    fields: fields.value.map((field) => field.value),
    location: location.value,
    about: about.value,
  };

  loading.value = true;
  errors.value = [];

  axios
    .post("/coaches/new", coach)
    .then((res) => {
      const { success, coach, message, errors: responseErrors } = res.data;

      if (success === true) {
        store.dispatch("addSuccessMessage", message);
        router.push({ name: "CoachViewPage", params: { coachId: coach._id } });
      } else if (success === false && responseErrors) {
        errors.value = responseErrors;
      }
    })
    .catch((err) => {
      store.dispatch("addErrorMessage", err.message);
    })
    .finally(() => {
      loading.value = false;
    });
}

function removeField(id) {
  fields.value = fields.value.filter((field) => field.id !== id);
}

function addField() {
  if (fieldValue.value) {
    fields.value.push({
      id: Date.now(),
      value: fieldValue.value,
    });
    fieldValue.value = "";
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
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
