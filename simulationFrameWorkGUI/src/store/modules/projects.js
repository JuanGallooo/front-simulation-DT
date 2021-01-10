import axios from "../../helpers/api";

// initial state
const state = {
  fileNames: [],
  planversions: [],
  initialDate: null,
  lastDate: null,
  planversionSeleted: null,
  projectNameSelected: null,
  typeSelected: null,
  uploadStatus: null,
  downloadArchive:null,
  projectNames:null
};

// Getters
const getters = {
  getAllFileNames: state => state.fileNames,
  getAllPlanVersions: state => state.planversions,
  getInitialDate: state => state.initialDate,
  getLastDate: state => state.lastDate,
  getPlanversionSeleted: state => state.planversionSeleted,
  getProjectNameSeleted: state => state.projectNameSelected,
  getTypeSelected: state => state.typeSelected,
  getUploadStatus: state => state.uploadStatus,
  getDownloadArchive: state => state.downloadArchive,
  getProjectNames: state=> state.projectNames,
};

// Actions
const actions = {
  uploadProject: function({ commit }, payload) {
    const headers = {
      headers:{"Content-Type": "multipart/form-data"}
    };
    let formData = new FormData();
    formData.append("file", payload);
    axios.post("project/upload", formData,headers).then(res => {
      console.log("Upload successfull!");
      commit("setUploadStatus", true);
      commit("setPlanVersions", res.data);
    });
  },
  loadAllFilesNames: function({ commit }, payload) {
    axios.get("/datasource/datagrams", payload).then(res => {
      commit("setFilesNameStates", res.data);
    });
  },
  loadPlanVersions: function({ commit }, payload) {
    axios
      .request({ url: "/datasource/planversions", data: null, params: payload })
      .then(res => {
        commit("setPlanVersions", res.data);
      });
  },
  loadDatesByPlanversion: function({ commit }, payload) {
    axios
      .request({ url: "/datasource/dates", date: null, params: payload })
      .then(res => {
        commit("setInitialDate", res.data[0]);
        commit("setFinalDate", res.data[1]);
      });
  },
  createProjectCSV: function({ commit }, payload) {
    axios.post("project/save", payload).then(res => {
      commit("setPlanversionSeleted", res.data);
    });
  },
  createProjectOracle: function({ commit }, payload) {
    axios.post("project/save/oracle", payload).then(res => {
      commit("setPlanversionSeleted", res.data);
    });
  },
  saveProject: function({ commit }, payload) {
    axios.get(`project/download/${payload}`).then(res => {
      commit("setDownloadArchive", res.data);
    });
  },
  projectsNames: function({ commit }, payload) {
    axios.get(`project/names`).then(res => {
      commit("setProjectsNames", res.data);
    });
  }
};

//mutations
const mutations = {
  setProjectsNames(state, payload) {
    state.projectNames = payload;
  },
  setPlanversionSeleted(state, planversionSeleted) {
    state.planversionSeleted = planversionSeleted;
  },
  setProjectNameSeleted(state, projectNameSelected) {
    state.projectNameSelected = projectNameSelected;
  },
  setTypeSelected(state, typeSelected) {
    state.typeSelected = typeSelected;
  },
  setFilesNameStates(state, filesNames) {
    state.fileNames = filesNames;
  },
  setPlanVersions(state, planversions) {
    state.planversions = planversions;
  },
  setInitialDate(state, initialDate) {
    state.initialDate = initialDate;
  },
  setFinalDate(state, finalDate) {
    state.lastDate = finalDate;
  },
  setUploadStatus(state, payload) {
    state.uploadStatus = payload;
  },
  setDownloadArchive(state, payload){
    state.downloadArchive = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
