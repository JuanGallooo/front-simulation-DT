<template>
  <v-app id="canvas">
    <sideBar>

    </sideBar>
  </v-app>
</template>
<script>
import sideBar from '../SideMenu/sideMenu'

export default {
  name: "Canvas",
  data() {
    return {};
  },
  components: {
    sideBar
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