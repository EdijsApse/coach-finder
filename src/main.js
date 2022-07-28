import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';

import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseModal from './components/ui/BaseModal.vue';

const app = createApp(App);

app.use(router);

app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-modal', BaseModal);

app.mount('#app')
