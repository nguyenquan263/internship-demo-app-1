import axios from 'axios';
import APILink from '../APILink';

export default {
    getAllInfo() {
        return axios.get(`${APILink.apiLink}info`);
    },
    deleteInfo(infoID) {
        return axios.delete(`${APILink.apiLink}info/${infoID}`);
    },
    addInfo(bodyData) {
        return axios.post(`${APILink.apiLink}info`, bodyData);
    },
    updateInfo(bodyData) {
        return axios.put(`${APILink.apiLink}info/${bodyData.updateID}`, bodyData.updateContent);
    }
}