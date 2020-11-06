<template>
    <div class="container">
        <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
                <div class="col-md-6 offset-md-3">
                    <form v-on:submit.prevent="onSubmit">
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
                            <label for="username">Email</label>
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
                        <button class="btn btn-sm btn-success">Register</button>
                    </form>
                </div>
            </div>
        </div>
        <h2>Register</h2>
    </div>
</template>

<script>
    export default {
        name: "Register",
        props:['app'],
        data() {
            return {
                username: '',
                email: '',
                password: '',
                Cpassword: '',
                errors:[]
            }
        },
        methods:{
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
                    this.app.req.post('auth/register', data).then(response => {
                        this.app.user = response.data;
                        this.$router.push("/dashboard");
                    }).catch(error => {
                        this.errors.push(error.response.data.error)
                    })
                }
            }
        }

    }
</script>

<style scoped>

</style>
