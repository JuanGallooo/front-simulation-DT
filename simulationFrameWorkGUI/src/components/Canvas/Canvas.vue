<template>
  <v-app id="canvas">
    <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <sideBar></sideBar>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            Hola
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <map></map>
          </v-col>
        </v-row>
  </v-app>
</template>
<script>
import sideBar from '../SideMenu/SideMenu'
import map from "../Map/Map"
export default {
  name: "Canvas",
  data() {
    return {};
  },
  components: {
    sideBar,
    map
  },
  created() {
    window.bus.$on('menu/toggle', () => {
      window.setTimeout(() => {
        this.isOpenMobileMenu = !this.isOpenMobileMenu;
      }, 200);
    });

    window.bus.$on('menu/closeMobileMenu', () => {
      this.isOpenMobileMenu = false;
    });

  },
};
</script>

<style>
</style>