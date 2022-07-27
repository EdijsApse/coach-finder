import { createApp } from 'vue'
import App from './App.vue'

import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButton from './components/ui/BaseButton.vue';

const app = createApp(App);

app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);

app.mount('#app')
