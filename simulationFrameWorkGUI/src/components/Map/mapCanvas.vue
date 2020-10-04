<template>
  <div id="map" class="map" style="height: 900px">
    <div v-for="stop in stops" :key="stop.id">
      <!-- label and input elements go here -->
    </div>
    <div v-for="bus in buses" :key="bus.id">
      <!-- label and input elements go here -->
    </div>
  </div>
</template>

<script>
import imageStop from './estacion_roja.png'
import imageBus from './bus_azul.png'


export default {
  name: "mapLeaflet",
  data() {
    return {
      map: null,
      tileLayer: null,
      stops: [],
      buses: []
    };
  },

  mounted: function(){

    this.initMap();


    let payload = {
      type: this.$store.getters['projects/getTypeSelected'],
      planVersionId: this.$store.getters['projects/getPlanversionSeleted'],
      lineId: 131
    };
    console.log(payload)

    if (this.$store.getters["stops/getAllStops"].length == 0) {
      this.$store.dispatch("stops/loadStops", payload)
    } else {
      this.stops = this.$store.getters["stops/getAllStops"]
    }

    let payloadBus = {
      projectName: this.$store.getters["projects/getProjectNameSeleted"]
    }
    console.log(payloadBus)

    if (this.$store.getters["buses/getAllBuses"].length==0) {
      this.$store.dispatch("buses/loadBuses", payloadBus)
    } else {
      this.buses = this.$store.getters["buses/getAllBuses"]
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "stops/setStopsToState") {
        this.stops = this.$store.getters["stops/getAllStops"]
        this.initStops();
      }
      if (mutation.type === "buses/setBusesToState"){
        this.buses = this.$store.getters["buses/getAllBuses"]
        console.log(this.buses)
        this.initBuses();
      }
    })

  },

  methods: {

    initMap() {
      this.map = L.map("map").setView([3.43722, -76.5225], 14);

      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );
      this.tileLayer.addTo(this.map);
    },

    initStops() {
      this.stops.forEach((stop) => {
        let coords = [stop.decimalLatitude, stop.decimalLongitude];
        var stopIcon = L.icon({iconUrl: imageStop,iconSize:[20, 20],iconAnchor:[20, 20],popupAnchor:[0, 0]})
        stop.leafletObject = L.marker(coords, {icon: stopIcon}).bindPopup(stop.longName).addTo(this.map);
      });
    },


    initBuses(){
      var markers = {};

      this.buses.forEach((bus) => {
        let coords = [bus.latitude, bus.longitude];
        var busIcon = L.icon({iconUrl: imageBus,iconSize:[20, 20],iconAnchor:[20, 20],popupAnchor:[0, 0]})

        if(markers[bus.busId]==null){
            markers[bus.busId] = L.marker(coords).addTo(this.map)
            markers[bus.busId].setIcon(busIcon);
        }else{
            markers[bus.busId].setIcon(busIcon);
            markers[bus.busId].setLatLng(coords);
        }
      })
    },

    loadStops: function (event) {
      this.$store.dispatch("stops/loadStops", payload)
    },

    loadBuses: function (event){
      this.$store.dispatch("buses/loadBuses", payloadBus)
    }
  },
};
</script>

<style>
</style>
