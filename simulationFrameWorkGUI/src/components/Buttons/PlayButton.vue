<template>
  <div>
    <v-row justify="space-around" align="center">
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
    </v-row>
    <v-row justify="space-around" align="left">
      <v-col cols="6" align="left" justify="left"> Read speed </v-col>
      <v-col cols="6" align="left" justify="left">
        <v-slider v-model="slider" thumb-label="always"></v-slider>
      </v-col>
    </v-row>
    <v-row justify="space-around" align="left">
      <v-col cols="6" align="left" justify="left"> Simulation speed </v-col>
      <v-col cols="6" align="left" justify="left">
        <v-slider v-model="sliderTwo" thumb-label="always"></v-slider>
      </v-col>
      </v-row>
    <v-data-table
      v-model="selected"
      :headers="headersPlanVersion"
      :items="planversions"
      :items-per-page="5"
      :single-select="true"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      item-key="name"
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
      slider: 45,
      sliderTwo: 45,
      getNowPlayingStatus: {
        isLoading: false,
      },
      fakeLoading: false,
      isPlaying: false,
      headersPlanVersion:[
        {
          text: "Ids",
          align: "start",
          value: "planVersionId",
        },
      ],
      headers: [
        {
          text: "Variables",
          align: "start",
          value: "name",
        },
        { text: "Values", value: "value" },
      ],
      planversions:[
        
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          value: "Ice cream",
        },
        {
          name: "Ice cream sandwich",
          value: "Ice cream",
        },
        {
          name: "Eclair",
          value: "Cookie",
        },
        {
          name: "Cupcake",
          value: "Pastry",
        },
        {
          name: "Gingerbread",
          value: "Cookie",
        },
        {
          name: "Jelly bean",
          value: "Candy",
        },
        {
          name: "Lollipop",
          value: "Candy",
        },
        {
          name: "Honeycomb",
          value: "Toffee",
        },
        {
          name: "Donut",
          value: "Pastry",
        },
        {
          name: "KitKat",
          value: "Candy",
        },
      ],
    };
  },
  methods: {
    play: function () {},
    pause: function () {},
    next: function () {},
    previous: function () {},
    togglePlayPause: function () {
      this.isPlaying = !this.isPlaying;
    },
  },
   mounted: function () {
    if(this.$store.getters['projects/getAllPlanVersions'].length==0){
      let payload= {type:"FileCSV"}
      this.$store.dispatch('projects/loadPlanVersions',payload)
    }else{
      this.planversions=this.$store.getters['projects/getAllPlanVersions']
        console.log(this.planversionID)
    }
    this.$store.subscribe( (mutation, state) => {
      if (mutation.type === 'projects/setPlanVersions') {
        this.planversions=this.$store.getters['projects/getAllPlanVersions']
        console.log(this.planversions)
      }

    })
  },
  computed: {},
};
</script>

<style>
</style>