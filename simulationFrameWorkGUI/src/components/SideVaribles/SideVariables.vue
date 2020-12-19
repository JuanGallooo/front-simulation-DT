<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="6" justify="left">
        <div class="play-pause-skip-controls">
          <div
            v-if="getNowPlayingStatus.isLoading || fakeLoading"
            class="spinner"
          ></div>
          <div v-else-if="!isPlaying" @click="togglePlayPause">
            <font-awesome-icon
              :icon="['fas', 'play']"
              class="play-pause-skip-controls__icons"
              size="2x"
            />
          </div>
          <div v-else @click="togglePlayPause">
            <font-awesome-icon
              :icon="['fas', 'pause']"
              class="play-pause-skip-controls__icons"
              size="2x"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="6" justify="left"> Read speed </v-col>
      <v-col cols="6" justify="left">
        <v-slider
          v-model="slider"
          v-on:change="changeReadSpeed"
          thumb-label="always"
          step="10"
          min="10"
          max="50"
          ticks="always"
          tick-size="4"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="6" justify="left"> Simulation speed </v-col>
      <v-col cols="6" justify="left">
        <v-slider
          v-model="sliderTwo"
          v-on:change="changeSimulationSpeed"
          thumb-label="always"
          step="10"
          min="10"
          max="30"
          ticks="always"
          tick-size="4"
        ></v-slider>
      </v-col>
    </v-row>
    <v-data-table
      v-model="lineSelected"
      :headers="headersLines"
      :items="lines"
      :items-per-page="5"
      :single-select="true"
      item-key="lineId"
      show-select
      class="elevation-1"
      :disabled="true"
    >
    </v-data-table>
    <v-data-table
      :headers="headers"
      :items="variables"
      :items-per-page="5"
      item-key="Values"
      class="elevation-1"

      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      }"
    ></v-data-table>
  </div>
</template>
<script>
export default {
  name: "PlayButton",
  data() {
    return {
      lineSelected: [],
      slider: 30,
      sliderTwo: 20,
      getNowPlayingStatus: {
        isLoading: false,
      },
      fakeLoading: false,
      isPlaying: false,
      headersLines: [
        {
          text: "Ids",
          value: "lineId",
        },
        { text: "Nombre", value: "shortName" },
      ],
      headers: [
        {
          text: "Variables",
          value: "header",
        },
        { text: "Values", value: "value" },
      ],
      lines: [],
      variables: [],
      inter: null,
      firstPlay:false
    };
  },
  methods: {
    play: function () {
      console.log("Llamando a empezar");
      // let payloadLine = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      //   lineId: this.lineSelected[0].lineId,
      // };
      let payloadLine = {
        projectName: this.$route.params.name,
        lineId: this.lineSelected[0].lineId,
      };
      console.log("Payload lines");
      console.log(payloadLine);
      this.$store.dispatch("simulation/setLine", payloadLine);

      // let payload = {
      //   type: this.$store.getters["projects/getTypeSelected"],
      //   planVersionId: this.$store.getters["projects/getPlanversionSeleted"],
      //   lineId: this.lineSelected[0].lineId,
      // };
      let payload = {
        type: this.$route.query.type,
        planVersionId: this.$route.query.planversion,
        lineId: this.lineSelected[0].lineId,
      };

      this.$store.dispatch("stops/loadStops", payload);

      // let payloadStart = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payloadStart = {
        projectName: this.$route.params.name,
      };
      this.$store.dispatch("simulation/startSimulation", payloadStart);
      this.inter = setInterval(() => {
        this.updateBuses();

        this.variables = this.$store.getters["variables/getAllCustomVariables"];
        this.$store.dispatch("variables/loadCustomVariables", payloadStart);
      },500);
    },
    updateBuses: function () {
      // let payloadBus = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payloadBus = {
        projectName: this.$route.params.name,
      };
      this.$store.dispatch("buses/loadBuses", payloadBus);
    },
    pause: function () {
      clearInterval(this.inter);
      // let payloadLine = {
      //       projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payloadLine = {
        projectName: this.$route.params.name,
      };
      this.$store.dispatch("simulation/pauseSimulation", payloadLine);
    },
    next: function () {},
    previous: function () {},
    togglePlayPause: function () {
      if(!this.firstPlay && !this.isPlaying){
        this.firstPlay= true
        this.play();
      }
      else{
        if (!this.isPlaying) {
          // let payloadLine = {
          //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
          // };
          let payloadLine = {
            projectName: this.$route.params.name,
          };
          this.$store.dispatch("simulation/resumeSimulation", payloadLine);
          this.inter = setInterval(() => {
            this.updateBuses();
            this.$store.dispatch("variables/loadCustomVariables", payloadLine);
            this.variables = this.$store.getters["variables/getAllCustomVariables"];
          },500);
        }else {
          this.pause();
        }
      }
      this.isPlaying = !this.isPlaying;
    },

    changeReadSpeed: function () {
      // let payload = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payload = {
        projectName: this.$route.params.name,
      };

      if (this.slider == 10) {
        this.$store.dispatch("clock/setOneToOneSpeed", payload);
      } else if (this.slider == 20) {
        this.$store.dispatch("clock/setOneToFiveSpeed", payload);
      } else if (this.slider == 30) {
        this.$store.dispatch("clock/setOneToTenSpeed", payload);
      } else if (this.slider == 40) {
        this.$store.dispatch("clock/setOneToThirtySpeed", payload);
      } else {
        this.$store.dispatch("clock/setOneToSixtySpeed", payload);
      }
    },
    changeSimulationSpeed: function () {
      // let payload = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payload = {
        projectName: this.$route.params.name,
      };
      if (this.sliderTwo == 10) {
        this.$store.dispatch("simulation/setSLow", payload);
      } else if (this.sliderTwo == 20) {
        this.$store.dispatch("simulation/setNormal", payload);
      } else if (this.sliderTwo == 30) {
        this.$store.dispatch("simulation/setFast", payload);
      }
    },
  },
  mounted: function () {
    if (this.$store.getters["lines/getAllLines"].length == 0) {
      // let payload = {
      //   type: "FileCSV",
      //   planVersionId: this.$store.getters["projects/getPlanversionSeleted"],
      // };
      let payload = {
        type: "FileCSV",
        planVersionId: this.$route.query.planversion,
      };
      // console.log("Payload para las lineas");
      // console.log(payload);
      this.$store.dispatch("lines/loadAllVariables", payload);
    } else {
      this.lines = this.$store.getters["lines/getAllLines"];
    }
    if (this.$store.getters["variables/getAllCustomVariables"].length == 0) {
      // let payload = {
      //   projectName: this.$store.getters["projects/getProjectNameSeleted"],
      // };
      let payload = {
        projectName: this.$route.params.name,
      };
      this.$store.dispatch("variables/loadCustomVariables", payload);
    } else {
      this.variables = this.$store.getters["variables/getAllCustomVariables"];
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "lines/setLinesToState") {
        this.lines = this.$store.getters["lines/getAllLines"];
      }
      if (mutation.type === "variables/setCustomVariables") {
        this.variables = this.$store.getters["variables/getAllCustomVariables"];
      }
    });
  },
  computed: {},
};
</script>

<style>
</style>
