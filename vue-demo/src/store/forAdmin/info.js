import infoAPI from '../../utils/adminAPIs/infoAPI';

const state = {
    infos: []
}
const getters = {}
const actions = {
    loadAllInfo: async({ commit, state }, authorizeToken) => {
        // console.log("Im in");

        const response = await infoAPI.getAllInfo(authorizeToken);
        return response.data;
    },
    addInfo: async({ commit, state }, addData) => {
        const response = await infoAPI.addInfo(addData);
        return response.data;
    },
    deleteInfo: async({ commit, state }, deleteInfo) => {
        // console.log('day ne babe' + deleteInfo.token);
        const response = await infoAPI.deleteInfo(deleteInfo.rowID, deleteInfo.token);
        return response.data;
    },
    updateInfo: async({ commit, state }, updateData) => {
        const response = await infoAPI.updateInfo(updateData);
        return response.data;
    }
}
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}