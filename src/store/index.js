import { createStore } from 'vuex';

import auth from './modules/auth';
import alert from './modules/alert';
import coach from './modules/coach';

export default createStore({
    modules: {
      auth,
      alert,
      coach
    }
});