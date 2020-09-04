import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './assets/admin-site/vendor/fontawesome-free/css/all.min.css';
import './assets/admin-site/fonts/font1.css';
import './assets/admin-site/css/sb-admin-2.min.css';
import './assets/commons/jquery.dataTables.min.css';
import './assets/commons/toastr.min.css';
import './assets/commons/jquery-confirm.min.css';
// import './assets/for-client/css/agency.min.css';
// import './assets/for-client/font/font1.css';
// import './assets/for-client/font/font2.css';
// import './assets/for-client/font/font3.css';
// import './assets/for-client/font/font4.css';
import './assets/commons/summernote.min.css';

import './assets/commons/jquery-global';
import './assets/commons/datatable-global';
import './assets/commons/toastr-global';
import './assets/commons/summernote-global';

import './assets/admin-site/vendor/bootstrap/js/bootstrap.bundle';
import './assets/admin-site/vendor/jquery-easing/jquery.easing';
import './assets/commons/jquery-confirm.min.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
