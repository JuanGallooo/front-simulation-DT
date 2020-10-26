import axios from '../../helpers/api'

// initial state
const state ={
  variables:[],
  customVariables:[]
}

// Getters
const getters={
  getAllVariables: state => state.variables,
  getAllCustomVariables: state => state.customVariables,
}

// Actions
const actions = {
  loadAllVariables: function({commit}, payload){
      axios.request({url:'/datasource/headers',data:null, params: payload})
      .then(res => {
          commit('setVariablesStates',res.data)
      })
  },
  loadCustomVariables: function({commit},payload){
    axios.request({url:'/variables/load',data:null, params: payload})
    .then(res => {
        commit('setCustomVariables',res.data)
    })
  },
  setVariablesInBack: function({commit}, payload){
    axios.put('/variables/setheaders/'+payload.projectName, payload.headersSelected)
    .then( res => {
      console.log("Variables cambiadas")
    })

  }



}

//mutations
const mutations={
  setVariablesStates(state, variables){
    state.variables= variables
  },
  setCustomVariables(state, customVariables){
    state.customVariables= customVariables
  }
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

