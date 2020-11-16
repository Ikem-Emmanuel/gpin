<template>
    <div>
        <div  class="container">
            <div class="col-md-6 mx-auto shadow-lg p-3 mb-5 bg-white rounded-lg">
                <div class="px-4 mb-n2">
                    <h4 class="font-weight-bold mt-3 text-primary">Create a new user</h4>
                </div>
                <spinner v-if="loading"></spinner>
                <div v-else class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="alert alert-success" role="alert" v-if="success">
                            User Created Successfully
                        </div>
                        <div class="alert alert-danger" v-if="errors.length">
                            <ul class="mb-0">
                                <li v-for="(error, index) in errors" :key="index">
                                    {{error}}
                                </li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" class="form-control" placeholder="Enter Username..." v-model="username">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="form-control" placeholder="Enter a valid Email..." v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" placeholder="Enter password..." v-model="password">
                        </div>
                        <div class="form-group">
                            <label for="Cpassword">Confirm Password</label>
                            <input type="password" id="Cpassword" class="form-control" placeholder="Confirm password..." v-model="Cpassword">
                        </div>
                        <button class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Register",
        props:['app'],
        data() {
            return {
                username: '',
                email: '',
                password: '',
                Cpassword: '',
                errors:[],
                loading:false,
                success: false,
            }
        },
        methods:{
            ...mapActions({
                Register: "auth/Register" //myFuntion: "namespace/myFunction"
            }),
            validEmail: function (email) {
                let parttern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return parttern.test(email);
            },
            onSubmit(){
                this.errors = [];
                if (!this.username){
                    this.errors.push('Username is required')
                }
                if (!this.email) {
                    this.errors.push('Email required.');
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Valid email required.');
                }
                if (!this.password){
                    this.errors.push('Password is required')
                }
                if (!this.Cpassword){
                    this.errors.push('Confirm Password is required')
                }
                if (this.password !== this.Cpassword){
                    this.errors.push('Password Do not match')
                }
                if (!this.errors.length){
                    const data = {
                        username : this.username,
                        email : this.email,
                        password : this.password,
                    }
                    this.loading = true
                    this.Register(data)
                        .then(() => {
                            this.loading = false
                            // this.$router.push({ name: "register" })
                            this.success = true
                        })
                        .catch(error => {
                            this.errors.push(error.response.data.error)
                            // console.log("Your are fake");
                        });
                    // this.app.req.post('auth/register', data).then(response => {
                    //     this.loading = true;
                    //     this.app.user = response.data;
                    //     // this.$router.push("/dashboard");
                    // }).catch(error => {
                    //     this.errors.push(error.response.data.error)
                    // })
                }
            }
        }

    }
</script>

<style scoped>

</style>
