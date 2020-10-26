import axios from '../../helpers/api'

// initial state
const state = {
  buses: [],
}

// Getters
const getters = {
  getAllBuses: state => state.buses,
}


// Actions
const actions = {
  loadBuses: function ({ commit }, payload) {
    axios.request({ url: '/system/buses', data: null, params: payload })
      .then(res => {
        commit('setBusesToState', res.data)
      })
  }
}


//mutations
const mutations = {
  setBusesToState(state, buses) {
    state.buses = buses
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


