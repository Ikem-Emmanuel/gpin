<template>
    <div>
        <navbar :app="this" class="mb-5"></navbar>
        <spinner v-if="loading"></spinner>
        <div v-else-if="initiated">
            <router-view :app="this"/>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar';
    import Login from "./pages/auth/Login";
    import axios from 'axios'
    export default {
        name: "app",
        components: {
            Login,
            Navbar
        },
        data() {
            return {
                user: null,
                loading: false,
                initiated: false,
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init()
            {
                this.loading = true;
                axios.get('/').then(() => {
                    this.loading = false;
                    this.initiated = true;
                })
            }
        }
    }
</script>
