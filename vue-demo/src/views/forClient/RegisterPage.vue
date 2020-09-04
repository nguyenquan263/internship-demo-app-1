<template>
<div>
<div class="container card mt-4 o-hidden border border-primary border-2 shadow-lg my-5" v-if="isRegistering">

<h3 class="mt-4 font-weight-bold">Fill your information:</h3>

<!-- Status go here -->
<div v-if="hasError">
  <div class="text-danger" v-html="errorString"></div>
</div>

<!-- Status go here -->

<form class="">
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Enter your full name ..." required v-model="info.fullname">
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Enter your address ..." required v-model="info.address">
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control" v-model="info.state">
        <option value="" selected>Choose you state...</option>
        <option v-for="(state, index) in states" v-bind:key="index" v-bind:value="state.abbr" >{{state.name}}</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip" placeholder="ZIP" required v-model="info.zip">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="exampleInputEmail1">Email</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email ..." required v-model="info.email">
    </div>
    <div class="form-group col-md-6">
      <label></label>
      <p>Ex: email@domain.com</p>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputPhone">Phone</label>
      <input type="tel" class="form-control" id="inputPhone" placeholder="Enter your phone number ..." required v-model="info.phone">
    </div>
    <div class="form-group col-md-6">
      <label></label>
      <p>Ex: XXX XXX XXXX</p>
    </div>
  </div>
  <div class="form-row mb-4">
    <div class="form-group col-md-6">
      <button id="submitButton" type="button" class="btn btn-primary" v-on:click="getClick">Submit</button>
    </div>
  </div>
</form>
</div>

<div>

</div>
  <div class="container card mt-4 o-hidden border border-primary border-2 shadow-lg my-5" v-if="!isRegistering">
    Done
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      states: [],
      info: {
        fullname: "",
        address: "",
        state: "",
        zip: "",
        email: "",
        phone: ""
      },
      errorString: "",
      isRegistering: true,
      hasError: false
    }
  },
  created: function() {
    let self = this;
    axios.get("https://una.edu/apps/api/states")
      .then(function(response) {
        console.log(response.data);
        self.states = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    getClick: function () {

      //CHECKING SECTION-------------------------------------------------------------------
      this.hasError = false;
      this.errorString = "";

      if (!this.info.fullname) {
        this.errorString += "<p>Please input your full name</p>";
        this.hasError = true;
      }

      if (!this.info.address) {
        this.errorString += "<p>Please input your address</p>";
        this.hasError = true;
      }

      if (!this.info.state) {
        this.errorString += "<p>Please input your state</p>";
        this.hasError = true;
      }

      var zipRegularExpression = /^[0-9]{5}(?:-[0-9]{4})?$/;
      if (!this.info.zip) {
        this.errorString += "<p>Please input your zip</p>";
        this.hasError = true;
      } else if (!zipRegularExpression.test(this.info.zip)) {
        this.errorString += "<p>This is not a zip code</p>";
        this.hasError = true;
      }

      var emailRegularExpression = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

      if (!this.info.email) {
        this.errorString += "<p>Please input your email</p>";
        this.hasError = true;
      } else if (!emailRegularExpression.test(this.info.email)) {
        this.errorString += "<p>This is not an email</p>";
        this.hasError = true;
      }

      var phoneRegularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

      if (!this.info.phone) {
        this.errorString += "<p>Please input your phone number</p>";
        this.hasError = true;
      } else if (!phoneRegularExpression.test(this.info.phone)) {
        this.errorString += "<p>This is not a phone number</p>";
        this.hasError = true;
      }

      //CHECKING SECTION-------------------------------------------------------------------

      //API COMMUNICATION SECTION----------------------------------------------------------
      if (this.hasError) {
        toastr.error("Invalid input");
      } else {
        toastr.success("Your input is ok now");

        axios.post("http://10.145.241.158:1607/info", this.info)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(err) {
            console.log(err);
          });

        this.isRegistering = false;
        console.log(this.info);
      }
      //API COMMUNICATION SECTION----------------------------------------------------------
    }
  },

}
</script>

<style>

</style>