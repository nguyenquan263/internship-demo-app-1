module.exports = {
    getBackendCRUDResponse(response) {
        var errorCode = response.errorCode;

        if (errorCode == 0){
            toastr.success(response.message);
        } else {
            if (response.data)
                toastr.error(response.message + "\n" +response.data.name);
            else
                toastr.error(response.message);
        }
    }
}