import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router"
import store from "./store";
import axios from "axios";

Vue.use(VueRouter);

require("./store/subscriber");
axios.defaults.baseURL = "http://localhost/gpin/public/";

Vue.config.productionTip = false;
Vue.component('spinner', require('vue-simple-spinner'));
store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app");
});


