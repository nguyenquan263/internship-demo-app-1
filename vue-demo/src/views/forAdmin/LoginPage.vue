<template>
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center" v-on:keyup.enter="loginClick()">

        <div class="col-xl-5 col-lg-7 col-md-9">

            <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                
                <div class="col-lg-12">
                    <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Sign In</h1>
                    </div>
                    <div class="user">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-user" id="txtUsername" placeholder="Username..." v-model="loginData.username">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control form-control-user" id="txtPassword" placeholder="Password" v-model="loginData.password">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-user btn-block" v-on:click="loginClick">Login</button>
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
import { mapActions } from 'vuex';
import { getBackendCRUDResponse } from '../../utils/common/notification';
import router from '../../router';


export default {
    data: function() {
        return {
            loginData: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions(['logIn', 'finalizeLogin']),
        loginClick: function() {
            this.logIn(this.loginData).then(response => {
                getBackendCRUDResponse(response);

                if (response.errorCode == 0) {
                    this.finalizeLogin(response);

                    router.push('/admin/info');
                }
            });
        }
    }
}

</script>

<style>

</style>