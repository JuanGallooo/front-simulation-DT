import axios from '../../helpers/api'

// initial state
const state ={
  variables:[]
}

// Getters
const getters={
  getAllVariables: state => state.variables,
}

// Actions
const actions = {
  loadAllVariables: function({commit}, payload){
      axios.request({url:'/datasource/headers',data:null, params: payload})
      .then(res => {
          commit('setVariablesStates',res.data)
      })
  }
}

//mutations
const mutations={
  setVariablesStates(state, variables){
      state.variables= variables
  }
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

