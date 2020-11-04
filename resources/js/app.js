require('./bootstrap');
import Vue from 'vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './router';
const router = new VueRouter({
    routes
});

Vue.component('spinner', require('vue-simple-spinner'));
import App from './App.vue'

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
