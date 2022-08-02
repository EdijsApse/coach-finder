import { createStore } from 'vuex';

import auth from './modules/auth';
import alert from './modules/alert';

export default createStore({
    modules: {
      auth,
      alert
    }
});