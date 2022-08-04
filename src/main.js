import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';

import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseTag from './components/ui/BaseTag.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseError from './components/ui/BaseError.vue';
import BaseFormControl from './components/ui/BaseFormControl.vue';
import BaseLoader from './components/ui/BaseLoader.vue';
import BasePagination from './components/ui/BasePagination.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-modal', BaseModal);
app.component('base-tag', BaseTag);
app.component('base-badge', BaseBadge);
app.component('base-error', BaseError);
app.component('base-form-control', BaseFormControl);
app.component('base-loader', BaseLoader);
app.component('base-pagination', BasePagination);

app.mount('#app')
