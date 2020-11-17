import Vue from "vue"
import VueRouter from "vue-router"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
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
        path: "/login",
        redirect: '/dashboard',
    },
    {
        path: "/home",
        redirect: '/'
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        beforeEnter: (to, from, next)=>{
            if(!store.getters['auth/authenticated']){
                return next({
                    name:'login'
                })
            }
            else next()
        }
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
            else next()
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
