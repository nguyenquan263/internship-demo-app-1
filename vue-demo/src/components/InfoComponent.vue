<template>
<div>
        <div class="card">
            <div class="card-header">
                <i class="fa fa-align-justify"></i> Info Management
                <div class="float-right">
                <button id="btnAdd" type="button" class="btn btn-primary btn-sm">
                    <i class="fa fa-plus"></i> Add</button>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="app-table-responsive">
                <table id="tbl" class="table table-responsive-sm table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
            </div>

            <!-- modal -->
            <div id="popup" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog  modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Info Management</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="hasError">
                      <div class="text-danger" v-html="errorString"></div>
                    </div>
                    <form class="">
                      <div class="form-group">
                        <label for="inputName">Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Enter your full name ..." required >
                      </div>
                      <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Enter your address ..." required >
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-4">
                          <label for="inputState">State</label>
                          <select id="inputState" class="form-control">
                            <option value="" selected>Choose you state...</option>
                            <option v-for="(state, index) in states" v-bind:key="index" v-bind:value="state.abbr" >{{state.name}}</option>
                          </select>
                        </div>
                        <div class="form-group col-md-2">
                          <label for="inputZip">Zip</label>
                          <input type="text" class="form-control" id="inputZip" placeholder="ZIP" required>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="exampleInputEmail1">Email</label>
                          <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter your email ..." required>
                        </div>
                        <div class="form-group col-md-6">
                          <label></label>
                          <p>Ex: email@domain.com</p>
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputPhone">Phone</label>
                          <input type="tel" class="form-control" id="inputPhone" placeholder="Enter your phone number ..." required>
                        </div>
                        <div class="form-group col-md-6">
                          <label></label>
                          <p>Ex: XXX XXX XXXX</p>
                        </div>
                      </div>
                    
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnSave" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBackendCRUDResponse } from '../utils/common/notification';
import axios from 'axios';
import APILink from '../utils/common/APILink';

export default {
    name: 'Admin',
    data() {
        return {
            updateID: -1,
            states: [],
            info: {},
            hasError: false,
            errorString: ""
        }
        
    },
    methods: {
        ...mapActions(['loadAllInfo', 'deleteInfo', 'addInfo', 'updateInfo']),
        checkInput: function () {
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

          var phoneRegularExpression = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

          if (!this.info.phone) {
            this.errorString += "<p>Please input your phone number</p>";
            this.hasError = true;
          } else if (!phoneRegularExpression.test(this.info.phone)) {
            this.errorString += "<p>This is not a phone number</p>";
            this.hasError = true;
          }
        }
    },
    created() {
      let self = this;
      axios.get(APILink.stateGetterLink)
      .then(function(response) {
        console.log(response.data);
        self.states = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    }, 
    mounted() {
        
        var self = this;

        var currentInfo = [];

        var tbl = $("#tbl").DataTable({
            "oLanguage": {
                "sLengthMenu": "Display _MENU_ records",
            },

            lengthMenu: [5, 7, 10],
            columnDefs: [
                { orderable: false, targets: [0, 4] }
            ],
            rowId: "id",
            columns: [
                {
                    data: null, className: "text-center", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: "fullname" },
                { data: "email" },
                { data: "phone" },
                {
                    data: null, 
                    className: "text-left", 
                    render: function (data, type, row) {
                        return  '<i data-group="grpEdit" style="cursor: pointer;" class="fa fa-edit text-success"></i> ' +
                                '<i data-group="grpDelete" style="cursor: pointer;" class="fa fa-trash text-danger"></i>';
                    }
                }
            ],
            initComplete: function (settings, json) {
                self.loadAllInfo().then(data => {
                    loadTable(data, settings.oInstance.api());
                });

            },
            drawCallback: function (settings) {
                bindTableEvents();
            }
            
        });
        
        function loadTable(admins, tableObject) {

            var tbl = tableObject;
            var data = admins;

            if (data.errorCode == 0) {
                tbl.clear().draw();
                tbl.rows.add(data.data); // Add new data
                tbl.columns.adjust().draw(); // Redraw the DataTable
                
                console.log(data.data);
                currentInfo = data.data;

            } else {
                console.log(data);
            }
            
        }

        

        $("#btnAdd").click(function () {
            $("#popup").modal('show');
            self.updateID = -1;
        });

        $("#btnSave").click(function() {
            if (self.updateID == -1) {

                var newInfo = {
                    fullname: $('#inputName').val() == "" ? null : $('#inputName').val(),
                    address: $('#inputAddress').val() == "" ? null : $('#inputAddress').val(),
                    state: $('#inputState').val() == "" ? null : $('#inputState').val(), 
                    zip: $('#inputZip').val() == "" ? null : $('#inputZip').val(),
                    email: $('#inputEmail').val() == "" ? null : $('#inputEmail').val(),
                    phone: $('#inputPhone').val() == "" ? null : $('#inputPhone').val(),
                }

                self.info = newInfo;

                this.hasError = false;
                self.checkInput();

                if (self.hasError == false) {
                  self.addInfo(self.info).then(response => {
                    getBackendCRUDResponse(response);

                    $('#inputName').val("");
                    $('#inputAddress').val("");
                    $('#inputState').val("");
                    $('#inputZip').val("");
                    $('#inputEmail').val("");
                    $('#inputPhone').val("");
                    $("#popup").modal('hide');

                    self.loadAllInfo().then(data => {
                        loadTable(data, tbl);
                    });
                  });
                }
                 
            } else {

                var updateInfo = {
                    fullname: $('#inputName').val() == "" ? null : $('#inputName').val(),
                    address: $('#inputAddress').val() == "" ? null : $('#inputAddress').val(),
                    state: $('#inputState').val() == "" ? null : $('#inputState').val(), 
                    zip: $('#inputZip').val() == "" ? null : $('#inputZip').val(),
                    email: $('#inputEmail').val() == "" ? null : $('#inputEmail').val(),
                    phone: $('#inputPhone').val() == "" ? null : $('#inputPhone').val(),
                }

                var updateInfo = {
                    updateID: self.updateID,
                    updateContent: updateInfo
                }

                self.info = updateInfo.updateContent;

                this.hasError = false;
                self.checkInput();

                if (self.hasError == false) {

                  self.updateInfo(updateInfo)
                  .then(response => {
                      console.log(response);
                      getBackendCRUDResponse(response);
                      
                      $('#inputName').val("");
                      $('#inputAddress').val("");
                      $('#inputState').val("");
                      $('#inputZip').val("");
                      $('#inputEmail').val("");
                      $('#inputPhone').val("");
                      $("#popup").modal('hide');

                      self.loadAllInfo().then(data => {
                          loadTable(data, tbl);
                      });
                  });
                }
            }
        });




        function bindTableEvents() {
            $("i[data-group=grpDelete]").off('click').click(function () {
                var rowId = $(this).closest('tr').attr('id');

                $.confirm({
                    title: 'Are you sure to delete this?',
                    content: '',
                    type: 'blue',
                    buttons: {   
                        ok: {
                            text: "Yes",
                            
                            btnClass: 'btn-primary',
                            keys: ['enter'],
                            action: function(){
                                self.deleteInfo(rowId).then(response => {
                                    getBackendCRUDResponse(response);

                                    self.loadAllInfo().then(data => {
                                        loadTable(data, tbl);
                                    });
                                });
                            }
                        },
                        cancel: {
                            text: 'No',
                            btnClass: 'btn-warning',
                            action: function(){}
                        }
                    }
                });
            });

            $("i[data-group=grpEdit]").off('click').click(function () {
                
                var infoID = $(this).closest('tr').attr('id');
                console.log(currentInfo);

                var targetInfo = currentInfo.find(info => {
                    return info.id == infoID;
                });

                console.log(targetInfo);


                $("#popup").modal('show');
              
                $('#inputName').val(targetInfo.fullname);
                $('#inputAddress').val(targetInfo.address);
                $('#inputState').val(targetInfo.state);
                $('#inputZip').val(targetInfo.zip);
                $('#inputEmail').val(targetInfo.email);
                $('#inputPhone').val(targetInfo.phone);
                
                self.updateID = infoID;
                
            });
        }
    }
}
</script>

<style scoped>
.app-table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.app-table-responsive.table-bordered {
  border: 0;
}
</style>