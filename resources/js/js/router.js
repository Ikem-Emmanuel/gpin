import Home from './pages/Home'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
export default [
    {
        path: '/',
        component: Home,
        name: 'home',
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard'
    }
]
