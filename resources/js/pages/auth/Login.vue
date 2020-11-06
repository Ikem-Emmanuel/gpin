<template>
    <div>
        <div  class="container">
            <div class="col-md-6 mx-auto shadow-lg p-3 mb-5 bg-white rounded-lg">
                <div class="px-4 mb-n2">
                    <h4 class="font-weight-bold mt-3 text-primary">Login</h4>
                </div>
                    <div class="card-body">
                            <form @submit.prevent="onSubmit">
                                <div class="alert alert-danger" v-if="errors.length">
                                    <ul class="mb-0">
                                        <li v-for="(error, index) in errors" :key="index">
                                            {{error}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" class="form-control" placeholder="Enter Username..." v-model="form.username">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" id="password" class="form-control" placeholder="Enter password..." v-model="form.password">
                                </div>
                                <button class="btn btn-primary">Login</button>
                            </form>
                    </div>
            </div>
        </div>
        <spinner v-if="loading"></spinner>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        name: "Login",
        props:['app'],
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                loading:false,
                initiated: false,
                errors:[]
            }
        },
        methods:{
            ...mapActions({
                logIn: "auth/logIn" //myFuntion: "namespace/myFunction"
            }),
            onSubmit(){
                this.errors = [];
                if (!this.form.username){
                    this.errors.push('Username is required')
                }
                if (!this.form.password){
                    this.errors.push('Password is required')
                }
                if (!this.errors.length){
                    const data = {
                        username : this.form.username,
                        password : this.form.password,
                    }
                    this.logIn(data)
                        .then(() => {
                            this.loading = true
                            this.$router.push({ name: "dashboard" })
                        })
                        .catch(error => {
                            this.errors.push(error.response.data.error)
                            console.log("Your are fake");
                        });
                }
            }
        }

    }
</script>

<style scoped>

</style>
