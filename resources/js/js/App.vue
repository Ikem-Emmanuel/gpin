<template>
    <div>
        <navbar :app="this" class="mb-5"></navbar>
        <spinner v-if="loading"></spinner>
        <div v-else-if="initiated">
            <login/>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar';
    import Login from "./pages/auth/Login";
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
                initiated: true,
                req: axios.create({
                    baseUrl: BASE_URL
                })
            }
        },
        // mounted() {
        //     this.init();
        // },
        methods:{
            init()
            {
                this.loading = true;
                this.req.post('api/login').then(response => {
                    this.user = response.data.user;
                    this.loading = false;
                    this.initiated = true;
                })
            }
        }
    }
</script>
