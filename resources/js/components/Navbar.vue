<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">

            <a class="navbar-brand" href="#"> <img :src="image" alt="Waec"/> CIVAMPEMS CHECKERS</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mr-5 text-white">
                    <li class="nav-item d-flex align-content-center">
                        <div v-if="authenticated" class="d-flex align-content-center">
                            <a class="nav-link text-white">Hi {{ user.username}}</a>
                            <a @click="logOut" href="javascript:;" class="nav-link text-white">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import logo from '../assets/logo.svg'
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Navbar",
        props: ['app'],
        data() {
            return {
                image:'images/logo.svg'
            };
        },
        computed: {
            ...mapGetters({
                user: "auth/user",
                authenticated: "auth/authenticated",
            })
        },
        methods: {
            ...mapActions({
                logOutAction: "auth/logOut"
            }),
            logOut() {
                this.logOutAction().then(() => {
                    this.$router.push({
                        name: "login"
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>

