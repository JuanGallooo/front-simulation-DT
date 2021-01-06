<template>
  <v-app id="canvas">
    <sideBar></sideBar>
    <v-row align="center" justify="center">
      <v-col cols="12"
        sm="6"
        md="6"
        offset-md="2"
        >
          <mapC></mapC>
      </v-col>
      <v-col cols="6"
        md="4">
        <side-variables></side-variables>
      </v-col>
    </v-row>
    <!-- <div style="display:flex; ">
      <div style="min-width:600px; padding: 0 0 0 120px">
        <mapC></mapC>
      </div>
      <div>
        <side-variables></side-variables>
      </div>
    </div> -->
  </v-app>
</template>
<script>
import sideBar from "../SideMenu/SideMenu";
import mapC from "../Map/mapCanvas";
import sideVariables from "../SideVaribles/SideVariables";
export default {
  name: "Canvas",
  data() {
    return {};
  },
  components: {
    "side-variables": sideVariables,
    sideBar,
    mapC
  },
  created() {
    // window.bus.$on("menu/toggle", () => {
    //   window.setTimeout(() => {
    //     this.isOpenMobileMenu = !this.isOpenMobileMenu;
    //   }, 200);
    // });
    // window.bus.$on("menu/closeMobileMenu", () => {
    //   this.isOpenMobileMenu = false;
    // });
  }
};
</script>

<style></style>
