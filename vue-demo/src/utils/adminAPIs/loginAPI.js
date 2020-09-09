import axios from 'axios';
import APILink from '../common/APILink';

export default {
    login(bodyData) {
        return axios.post(`${APILink.apiLink}login`, bodyData);
    }
}