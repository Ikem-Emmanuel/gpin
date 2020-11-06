<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mr-5">
                    <li class="nav-item">
                        <a class="nav-link">
                            <router-link to="/login" class="dropdown-item">Login</router-link>
                        </a>
                        <a class="nav-link">
                            {{ user ? user.name : 'Account'}}
                        </a>
                        <a class="nav-link">
                            <a v-else @click="logout" href="javascript:;" class="dropdown-item">out</a>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Navbar",
        props: ['app'],
        data() {
            return {};
        },
        computed: {
            ...mapGetters({
                user: "auth/user",
                authenticated: "auth/authenticated",
            })
        },
        methods: {
            logout(){
                this.app.req.post('auth/logout').then(() => {
                    this.app.user = null;
                    this.$router.push('/login')
                })
            }
        }
    }
</script>

<style scoped>

</style>
