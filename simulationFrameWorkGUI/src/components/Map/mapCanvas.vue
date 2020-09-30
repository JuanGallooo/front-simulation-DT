<template>
  <div id="map" class="map" style="height: 900px">
    <div v-for="stop in stops" :key="stop.id">
      <!-- label and input elements go here -->
    </div>
  </div>
</template>

<script>
export default {
  name: "mapLeaflet",
  data() {
    return {
      map: null,
      tileLayer: null,
      stops: [],
    };
  },

  mounted: function(){

    this.initMap();

    let payload = {
      type: "FileCSV",
      planVersionId: 261,
      lineId: 131,
    };

    if (this.$store.getters["stops/getAllStops"].length == 0) {
      this.$store.dispatch("stops/loadStops", payload)
    } else {
      this.stops = this.$store.getters["stops/getAllStops"]
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "stops/setStopsToState") {
        this.stops = this.$store.getters["stops/getAllStops"]
        console.log(this.stops)
        this.initStops();
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
      console.log("stops");
      console.log(this.stops)
      this.stops.forEach((stop) => {
        let coords = [stop.decimalLatitude, stop.decimalLongitude];
        const Gicon = L.icon({iconUrl: "../../assets/estacion_roja.png",iconSize:[20, 20],iconAnchor:[20, 20],popupAnchor:[0, 0]})
        stop.leafletObject = L.marker(coords, {icon: Gicon}).bindPopup(stop.longName);
        stop.leafletObject.addTo(this.map);
      });
    },

    loadStops: function (event) {
      this.$store.dispatch("stops/loadStops", payload)
    },
  },
};
</script>

<style>
</style>
