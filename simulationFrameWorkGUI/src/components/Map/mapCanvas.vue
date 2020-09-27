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
      layers: [
        {
          id: 0,
          name: "StationRed",
          type: "stop",
          coords: [38.6109607, -90.2050322],
        },
        {
          id: 1,
          name: "Pappy's Smokehouse",
          type: "stop",
          coords: [38.6350008, -90.2261532],
        },
        {
          id: 2,
          name: "Broadway Oyster Bar",
          type: "stop",
          coords: [38.6188362, -90.1947098],
        },
        {
          id: 3,
          name: "Charlie Gitto's On the Hill",
          type: "stop",
          coords: [38.617972, -90.2756436],
        },
        {
          id: 4,
          name: "Sugarfire",
          type: "stop",
          coords: [38.6304077, -90.1916921],
        },
        {
          id: 5,
          name: "The Shaved Duck",
          type: "marker",
          coords: [38.6036282, -90.2381407],
        },
        {
          id: 6,
          name: "Mango Restaurant",
          type: "marker",
          coords: [38.6313642, -90.1961267],
        },
        {
          id: 7,
          name: "Zia's Restaurant",
          type: "marker",
          coords: [38.6157376, -90.27716],
        },
        {
          id: 8,
          name: "Anthonio's Taverna",
          type: "marker",
          coords: [38.6143846, -90.280048],
        },
      ],
    };
  },

  mounted() {
    this.initMap();
    this.initLayers();
  },

  methods: {

    layerChanged(layerId) {

      console.log("Layer Changed")

      const layer = this.layers.find(layer => layer.id === layerId);
      layers.forEach((layer) => {
        layer.leafletObject.addTo(this.map);
      })

    },

    initLayers() {
      console.log("Init Layers")
      this.layers.forEach((layer) => {
        if(layer.type === 'stop'){
          layer.leafletObject = L.marker(layer.coords).bindPopup(layer.name);
          layer.leafletObject.addTo(this.map);
          console.log(layer.name);
          console.log(layer.id);
        }
        //const markerStops = this.layers; //layer.features.filter(feature => feature.type === 'marker');
        //const markerStops = this.layers.filter(layer => layer.type === 'stop');
        //console.log(markerStops)
        //markerStops.forEach((layer) => {
        //  console.log(layer.name);
        //})
      })
    },

    initMap() {

      this.map = L.map("map").setView([38.63, -90.23], 12);

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
  },
};
</script>

<style>
</style>
