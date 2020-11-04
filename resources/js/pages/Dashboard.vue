<template>
        <div class="container col-md-4">
            <div class="card mb-4">
                <div class="card-header">Get Student Details</div>
                <div class="card-body">
                    <div class="w-auto">
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
                                <input type="number" id="examNo" class="form-control" placeholder="Enter Examination Number..." v-model="examNo">
                            </div>
                            <button class="btn btn-success">Submit</button>
                        </form>
                        <spinner v-if="loading"></spinner>
                        <div v-else-if="initiated">
                            <div class="mt-3 mb-2 ">
                                <div class="card-header">Student Details</div>
                                <div class="p-4">
                                    <div class="row mb-1">
                                        <div class="row mb-3 w-100">
                                            <div class="col">
                                                <p class="font-weight-bold h6">Surname : </p>
                                                <p v-model="fields.surname">{{fields.surname}}</p>
                                            </div>
                                            <div class="col">
                                                <p class="font-weight-bold h6">First Name : </p>
                                                <p v-model="fields.first_name">{{fields.first_name}}</p>
                                            </div>
                                            <div class="col">
                                                <p class="font-weight-bold h6">Other Names : </p>
                                                <p v-model="fields.other_name">{{fields.other_name}}</p>
                                            </div>
                                        </div>
                                        <div class="row w-100">
                                            <div class="col">
                                                <p class="font-weight-bold h6">Exam Number : </p>
                                                <p v-model="fields.exam_no">{{fields.exam_no}}</p>
                                            </div>
                                            <div class="col">
                                                <p class="font-weight-bold h6">Serial Number : </p>
                                                <p v-model="fields.serial">{{fields.serial}}</p>
                                            </div>
                                            <div class="col">
                                                <p class="font-weight-bold h6">Pin : </p>
                                                <p v-model="fields.pin">{{fields.pin}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
    export default {
        name: "Dashboard",
        props:['app'],
        data () {
            return{
                fields:{},
                examNo: null,
                errors : [],
                loading: false,
                initiated: false,
                success: false,
            }
        },
        methods:{
            onSubmit(){
                this.errors = [];
                if (this.examNo === 10 ){
                    this.errors.push('Exam Number must be greater than 10')
                }
                if (this.examNo === ' ' ){
                    this.errors.push('Only valid Examination numbers are allowed')
                }
                this.loading = true
                if (!this.errors.length){
                    this.app.req.get(`auth/details?examNo=${this.examNo}`).then(response => {
                        this.fields = response.data;
                        this.loading = false;
                        this.success = true;
                        this.initiated = true;
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
