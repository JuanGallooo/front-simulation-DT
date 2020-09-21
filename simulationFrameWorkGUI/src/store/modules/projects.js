import axios from '../../helpers/api'

// initial state
const state ={
    fileNames:[],
    planversions:[],
    initialDate: null,
    lastDate: null,
}

// Getters
const getters={
    getAllFileNames: state => state.fileNames,
    getAllPlanVersions: state => state.planversions,
    getInitialDate: state=> state.initialDate,
    getLastDate: state=> state.lastDate
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
        axios.request({url:'/datasource/planversions',data:null, params: payload})
        .then(res => {      
            console.log(res.data)
            commit('setPlanVersions',res.data)
        })
    },
    loadDatesByPlanversion: function({commit},payload){
        axios.request({url:'/datasource/dates', date:null, params:payload})
        .then(res => {
            console.log(res.data)
            commit('setInitialDate',res.data[0])
            commit('setFinalDate',res.data[1])
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
    },
    setInitialDate(state,initialDate){
        state.initialDate= initialDate
    },
    setFinalDate(state,finalDate){
        state.lastDate= finalDate
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}