import axios from '../../helpers/api'

// initial state
const state ={
    stops:[],
}

// Getters
const getters={
    getAllStops: state => state.stops,
}

// Actions
const actions = {
    loadStops: function({commit},payload){
        axios.request({url: '/datasource/stops',data:null, params: payload})
        .then(res => {
            commit('setStopsToState',res.data)
            console.log(res.data)
        })
    }
}

//mutations
const mutations={
    setStopsToState(state,stops){
        state.stops= stops
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
