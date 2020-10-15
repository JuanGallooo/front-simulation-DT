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
      buses: [],
      layerGroupStops: null,
      layerGroupBuses: null,
      markers: {},
    };
  },

  mounted: function(){
    this.initMap();


    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "stops/setStopsToState") {
        this.stops = this.$store.getters["stops/getAllStops"]
        this.layerGroupStops = L.layerGroup().addTo(this.map);
        this.initStops();
      }
      if (mutation.type === "buses/setBusesToState"){
        this.buses = this.$store.getters["buses/getAllBuses"]
        this.layerGroupBuses = L.layerGroup().addTo(this.map);
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
        var stopIcon = L.icon({iconUrl: imageStop,iconSize:[20, 20],iconAnchor:[20, 20],popupAnchor:[0, 0]});
        L.marker(coords, {icon: stopIcon}).bindPopup(stop.longName).addTo(this.layerGroupStops);
      });
    },


    initBuses(){

      this.buses.forEach((bus) => {
        let coords = [bus.latitude, bus.longitude];
        var busIcon = L.icon({iconUrl: imageBus,iconSize:[20, 20],iconAnchor:[20, 20],popupAnchor:[0, 0]})

        if(this.markers[bus.busId]==null){
          this.markers[bus.busId] = L.marker(coords).addTo(this.layerGroupBuses)
            this.markers[bus.busId].setIcon(busIcon);
        }else{
          this.markers[bus.busId].setIcon(busIcon);
            this.markers[bus.busId].setLatLng(coords);
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
