<template>
  <v-app id="canvas">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <sideBar></sideBar>
      </v-col>
      <v-col cols="12" sm="8" md="4">
        <mapC></mapC>
      </v-col>
      <v-col cols="12" sm="8" md="4">
        <play-button></play-button>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import sideBar from "../SideMenu/SideMenu";
import mapC from "../Map/mapCanvas";
import playButton from "../Buttons/PlayButton";
export default {
  name: "Canvas",
  data() {
    return {};
  },
  components: {
    "play-button": playButton,
    sideBar,
    mapC,
  },
  created() {
    window.bus.$on("menu/toggle", () => {
      window.setTimeout(() => {
        this.isOpenMobileMenu = !this.isOpenMobileMenu;
      }, 200);
    });

    window.bus.$on("menu/closeMobileMenu", () => {
      this.isOpenMobileMenu = false;
    });
  },
};
</script>

<style>
</style>
