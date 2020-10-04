import axios from '../../helpers/api'

// initial state
const state = {
  fileNames: [],
  planversions: [],
  initialDate: null,
  lastDate: null,
  planversionSeleted: null,
  projectNameSelected: null,
  typeSelected: null
}

// Getters
const getters = {
  getAllFileNames: state => state.fileNames,
  getAllPlanVersions: state => state.planversions,
  getInitialDate: state => state.initialDate,
  getLastDate: state => state.lastDate,
  getPlanversionSeleted: state => state.planversionSeleted,
  getProjectNameSeleted: state => state.projectNameSelected,
  getTypeSelected: state => state.typeSelected
}

// Actions
const actions = {
  loadAllFilesNames: function ({ commit }, payload) {
    axios.get('/datasource/datagrams', payload)
      .then(res => {
        commit('setFilesNameStates', res.data)
      })
  },
  loadPlanVersions: function ({ commit }, payload) {
    axios.request({ url: '/datasource/planversions', data: null, params: payload })
      .then(res => {
        commit('setPlanVersions', res.data)
      })
  },
  loadDatesByPlanversion: function ({ commit }, payload) {
    axios.request({ url: '/datasource/dates', date: null, params: payload })
      .then(res => {
        commit('setInitialDate', res.data[0])
        commit('setFinalDate', res.data[1])
      })
  },
  createProjectCSV: function ({ commit }, payload) {
    axios.post('project/save', payload)
      .then(res => {
        console.log(res.data)
      })
  },
  createProjectOracle: function ({ commit }, payload) {
    axios.post('project/save/oracle', payload)
      .then(res => {
        console.log(res.data)
      })
  }
}

//mutations
const mutations = {
  setPlanversionSeleted(state, planversionSeleted){
    state.planversionSeleted = planversionSeleted
    console.log("Entro projectNameSeleted")
  },
  setProjectNameSeleted(state, projectNameSelected){
    state.projectNameSelected = projectNameSelected
    console.log("Entro projectNameSeleted")
  },
  setTypeSelected(state, typeSelected){
    state.typeSelected = typeSelected
  },
  setFilesNameStates(state, filesNames) {
    state.fileNames = filesNames
  },
  setPlanVersions(state, planversions) {
    state.planversions = planversions
  },
  setInitialDate(state, initialDate) {
    state.initialDate = initialDate
  },
  setFinalDate(state, finalDate) {
    state.lastDate = finalDate
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
