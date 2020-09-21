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
  loadAllVariables: function({commit}){
      axios.get('/datasource/variables')
      .then(res => {
          commit('setVariablesStates',res.data)
      })
  }
}

//mutations
const mutations={
  setVariablesStates(state){
      state.variables= variables
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}

