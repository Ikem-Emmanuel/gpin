<template>
        <div class="container">
            <div class="card mb-4">
                <div class="card-header">Get Student Details</div>
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
                                <label for="examNo">Enter Examination Number</label>
                                <input type="number" id="examNo" class="form-control" placeholder="Enter Examination Number..." min v-model="examNumber">
                            </div>
                            <button class="btn btn-sm btn-success">Register</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card ">
                <div class="card-header">Get Student Details</div>
                <div class="card-body">
                    <div class="col-md-6 offset-md-3">
                        Student Details
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
    export default {
        name: "Dashboard",
        data () {
            return{
                examNumber: 12345678,
                errors : [],
                success: false,
            }
        },
        methods:{
            onSubmit(){
                this.errors = [];
                if (this.examNumber !== 10 ){
                    this.errors.push('Exam Number must be greater than 10')
                }
                if (!this.errors.length){
                    const data = {
                        examNumber : this.username,
                    }
                    this.app.req.post('auth/register', data).then(response => {
                        this.app.user = response.data;
                        this.success = true;
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
