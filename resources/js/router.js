import Vue from "vue"
import VueRouter from "vue-router"
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import store from './store'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        beforeEnter: (to, from, next)=>{
            if(!store.getters['auth/authenticated']){
                return next({
                    name:'login'
                })
            }
            next()
        }
    }
]

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.requiresAuth)) {
//     if (store.getters["auth/authenticated"]) {
//       next();
//     } else {
//       next({ path: "/login" });
//     }
//   }
//   next();
// });
export default router;
