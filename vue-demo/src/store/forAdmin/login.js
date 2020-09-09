import loginAPI from '../../utils/adminAPIs/loginAPI';
const state = {
    currentUser : null
}
const getters = {
    getCurrentUser: (state) => {
        return state.currentUser;
    }
}
const actions = {
    logIn: async({ commit, state }, bodyData) => {
        
        console.log(bodyData);
        const response = await loginAPI.login(bodyData);
        return response.data;
    },
    finalizeLogin: ({commit}, userInfo) => {
        console.log('im in');
        commit('setCurrentUser', userInfo);
    }
}
const mutations = {
    setCurrentUser: (state, currentUser) => {
        state.currentUser = currentUser;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}