<template>
  <div id="map" class="map" style="height: 900px">
    <div class="form-check" v-for="layer in layers" :key="layer.id">
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
      layers: [],
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
      this.layers = this.$store.getters["stops/getAllStops"]
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "stops/setStopsToState") {
        this.layers = this.$store.getters["stops/getAllStops"]
        //actualizar los stops
        console.log(this.layers)
        this.initLayers(this.layers);
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

    initLayers(layers) {
      console.log("Layers");
      console.log(this.layers)
      this.layers.forEach((layer) => {
        let coords = [layer.decimalLatitude, layer.decimalLongitude];
        layer.leafletObject = L.marker(coords).bindPopup(layer.longName);
        layer.leafletObject.addTo(this.map);
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
