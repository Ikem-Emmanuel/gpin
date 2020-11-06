<template>
        <div class="container col-md-6">
            <div class="col-md-8 mx-auto shadow-lg p-3 mb-5 bg-white rounded-lg">
                <div class=" mb-3">
                    <h6 class="font-weight-bold mt-3 text-primary">Enter Student Examination Number</h6>
                </div>
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
                            <input type="number" id="examNo" class="form-control" placeholder="Enter Examination Number..." v-model="examNo">
                        </div>
                        <button class="btn btn-primary">Submit</button>
                    </form>
                    <spinner v-if="loading" ></spinner>
                    <div v-else-if='initiated'>
                        <div class="mt-3 mb-2 ">
                            <div class=" mb-1 mt-3">
                                <h6 class="font-weight-bold mt-3 text-primary">Candidates Details</h6>
                            </div>
                            <div class="">
                                <div class="mx-auto">
                                    <table class="table table-bordered" id="" width="100%" cellspacing="0">
                                        <tr>
                                            <td class="text-left font-weight-bold" >Surname</td>
                                            <td >{{studentDetails.surname}}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left font-weight-bold" width="40%">First Name</td>
                                            <td>{{studentDetails.first_name}}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left font-weight-bold" width="40%">Other Names</td>
                                            <td>{{studentDetails.other_names}}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left font-weight-bold" width="40%">Exam Numbers</td>
                                            <td >{{studentDetails.exam_no}}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left font-weight-bold" width="40%">Serial Number</td>
                                            <td >{{studentDetails.serial}}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left font-weight-bold" width="40%">Pin</td>
                                            <td>{{studentDetails.pin}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
    // import {mapState} from 'vuex'
    import {mapActions, mapGetters} from "vuex";
    export default {
        name: "Dashboard",
        data () {
            return{
                examNo: null,
                errors : [],
                loading: false,
                initiated: false,
                success: false,
            }
        },
        computed: {
           ...mapGetters({
               studentDetails: "auth/studentDetails",
               authenticated: "auth/authenticated",
           })
        },

        methods:{
            ...mapActions({
                getStudentDetails: "auth/getStudentDetails" //myFuntion: "namespace/myFunction"
            }),
            onSubmit(){
                this.errors = [];
                if (this.examNo === 10 ){
                    this.errors.push('Exam Number must be greater than 10')
                }
                if (this.examNo === ' ' ){
                    this.errors.push('Only valid Examination numbers are allowed')
                }
                if (!this.errors.length){
                    this.loading = true
                    this.getStudentDetails(this.examNo).then(()=>{
                        this.loading = false;
                        this.success = true;
                        this.initiated = true;
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
