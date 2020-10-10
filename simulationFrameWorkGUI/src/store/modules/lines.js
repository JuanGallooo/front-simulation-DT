import axios from '../../helpers/api'

// initial state
const state ={
  lines:[],
}

// Getters
const getters={
  getAllLines: state => state.lines
}

// Actions
const actions = {
  loadAllVariables: function({commit}, payload){
      axios.request({url:'/datasource/lines',data:null, params: payload})
      .then(res => {
          commit('setLinesToState',res.data)
      })
  },
}

//mutations
const mutations={
  setLinesToState(state, lines){
    state.lines= lines
  },
}

export default{
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

