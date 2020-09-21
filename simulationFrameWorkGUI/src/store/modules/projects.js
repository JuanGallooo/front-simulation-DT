import axios from '../../helpers/api'

// initial state
const state ={
    fileNames:[],
    planversions:[]
}

// Getters
const getters={
    getAllFileNames: state => state.fileNames,
    getAllPlanVersions: state => state.planversions
}

// Actions
const actions = {
    loadAllFilesNames: function({commit},payload){
        axios.get('/datasource/datagrams',payload)
        .then(res => {
            commit('setFilesNameStates',res.data)
        })
    },
    loadPlanVersions: function({commit},payload){
        console.log(payload)
        axios.get('/datasource/planversions',params={type:"oracle"})
        .then(res => {
            console.log(res.data)
            commit('setPlanVersions',res.data)
        })
    }
}

//mutations 
const mutations={
    setFilesNameStates(state,filesNames){
        state.fileNames= filesNames
    },
    setPlanVersions(state,planversions){
        state.planversions= planversions
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}