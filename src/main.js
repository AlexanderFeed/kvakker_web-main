import { createApp } from 'vue';
import App from './App.vue';
import regPrimeVue from './primeVueReg/primevue.js';
import router from './router';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/aura-light-noir/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
(async function () {
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    regPrimeVue(app);
    app.mount('#app');
})();
