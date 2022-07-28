import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';

import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseTag from './components/ui/BaseTag.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

const app = createApp(App);

app.use(router);

app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-modal', BaseModal);
app.component('base-tag', BaseTag);
app.component('base-badge', BaseBadge);

app.mount('#app')
