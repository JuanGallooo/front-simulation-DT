import axios from '../../helpers/api'

// initial state
const state ={
    stops:[],
    flagGetStops:{}
}

// Getters
const getters={
    getAllStops: state => state.stops,
    getFlagGetStops: state=> state.getFlagGetStops
}

// Actions
const actions = {
    loadStops: function({commit},payload){
        axios.get('stops/',payload)
        .then(res => {
            commit('setStopsToState',res.data)
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