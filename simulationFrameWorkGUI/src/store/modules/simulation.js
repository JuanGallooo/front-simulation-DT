import axios from '../../helpers/api'

// initial state
const state = {
    start: false,
}

// Getters
const getters = {
    getStart: state => state.start
}

// Actions
const actions = {
    startSimulation: function ({ commit }, payload) {
        axios.put('/controller/start/' + payload.projectName)
            .then(res => {
                console.log("Start simulation")
            })
    },
    pauseSimulation: function ({ commit }, payload) {
        axios.put('/controller/pause/' + payload.projectName)
            .then(res => {
                console.log("Pause simulation")
            })
    },
    resumeSimulation: function ({ commit }, payload) {
        axios.put('/controller/resume/' + payload.projectName)
            .then(res => {
                console.log("Resume simulation")
            })
    },
    stopSimulation: function ({ commit }, payload) {
        axios.put('/controller/stop/' + payload.projectName)
            .then(res => {
                console.log("Stop simulation")
            })
    },
    setLine: function ({ commit }, payload) {
        axios.put('/project/setline/' + payload.projectName + '/' + payload.lineId)
            .then(res => {
                console.log("Line set simulation")
            })
    }
}

//mutations
const mutations = {
    setLinesToState(state, lines) {
        state.lines = lines
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

