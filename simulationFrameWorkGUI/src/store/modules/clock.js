import axios from '../../helpers/api'

// initial state
const state = {
    readSpeed: null,
    simulationSpeed: null,
}

// Getters
const getters = {
    getReadSpeed: state => state.readSpeed,
    getSimulationSpeed: state => state.simulationSpeed,
}

// Actions
const actions = {
    getClock: function ({ commit }, payload) {
        axios.request({ url: '/clock/load', data: null, params: payload })
            .then(res => {
                commit('setReadSpeed', res.data)
            })
    },
    setOneToOneSpeed: function ({ commit }, payload) {
        axios.put('/clock/set1to1/' + payload.projectName)
            .then(res => {
                console.log("ReadSpeed 1/1")
            })
    },
    setOneToFiveSpeed: function ({ commit }, payload) {
        axios.put('/clock/set1to5/' + payload.projectName)
            .then(res => {
                console.log("ReadSpeed 1/5")
            })
    },
    setOneToTenSpeed: function ({ commit }, payload) {
        axios.put('/clock/set1to10/' + payload.projectName)
            .then(res => {
                console.log("ReadSpeed 1/10")
            })
    },
    setOneToThirtySpeed: function ({ commit }, payload) {
        axios.put('/clock/set1to30/' + payload.projectName)
            .then(res => {
                console.log("ReadSpeed 1/30")
            })
    },
    setOneToSixtySpeed: function ({ commit }, payload) {
        axios.put('/clock/set1to60/' + payload.projectName)
            .then(res => {
                console.log("ReadSpeed 1/60")
            })
    },
}

//mutations
const mutations = {
    setReadSpeed(state, readSpeed) {
        state.readSpeed = readSpeed
    },
    setSimulationSpeed(state, simulationSpeed) {
        state.simulationSpeed = simulationSpeed
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

