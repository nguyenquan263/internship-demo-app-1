import axios from 'axios';
import APILink from '../common/APILink';

export default {
    getAllInfo(authorizeToken) {
        return axios.get(`${APILink.apiLink}info`, {
            headers: {
                'Authorization': 'Bearer ' + authorizeToken
            }
        });
    },
    deleteInfo(infoID, authorizeToken) {
        // console.log('day ne' + authorizeToken)
        return axios.delete(`${APILink.apiLink}info/${infoID}`, {
            headers: {
                'Authorization': 'Bearer ' + authorizeToken
            }
        });
    },
    addInfo(addData) {
        return axios.post(`${APILink.apiLink}info`, addData.data, {
            headers: {
                'Authorization': 'Bearer ' + addData.token
            }
        });
    },
    updateInfo(updateData) {
        return axios.put(`${APILink.apiLink}info/${updateData.data.updateID}`, updateData.data.updateContent , {
            headers: {
                'Authorization': 'Bearer ' + updateData.token
            }
        });
    }
}