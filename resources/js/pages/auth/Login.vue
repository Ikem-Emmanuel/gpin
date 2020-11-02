<template>
    <div class="container">
        <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
                <div class="col-md-4 offset-md-3">
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
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" placeholder="Enter password..." v-model="password">
                        </div>
                        <button class="btn btn-sm btn-success">Login</button>
                    </form>
                </div>
            </div>
        </div>
        <h2>Login</h2>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props:['app'],
        data() {
            return {
                username: '',
                password: '',
                errors:[]
            }
        },
        methods:{
            onSubmit(){
                this.errors = [];
                if (!this.username){
                    this.errors.push('Username is required')
                }
                if (!this.password){
                    this.errors.push('Password is required')
                }
                if (!this.errors.length){
                    const data = {
                        username : this.username,
                        password : this.password,
                    }
                    this.app.req.post('auth/login', data).then(response => {
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
