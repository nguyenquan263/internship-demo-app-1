import infoAPI from '../../utils/adminAPIs/infoAPI';

const state = {
    infos: []
}
const getters = {}
const actions = {
    loadAllInfo: async({ commit, state }) => {
        // console.log("Im in");

        const response = await infoAPI.getAllInfo();
        return response.data;
    },
    addInfo: async({ commit, state }, bodyData) => {
        const response = await infoAPI.addInfo(bodyData);
        return response.data;
    },
    deleteInfo: async({ commit, state }, infoID) => {
        const response = await infoAPI.deleteInfo(infoID);
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