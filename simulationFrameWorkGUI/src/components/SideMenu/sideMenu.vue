<template>
  <div class="menu-container">
    <ul class="menu">
      <li>
        <a
          href="#"
          @click.prevent="updateMenu('project')"
          :class="highlightSection('project')"
        >
          <i class="fas fa-folder menu__icon" aria-hidden="true"></i>
          Proyecto &nbsp;
          <i
            class="fa fa-chevron-right menu__arrow-icon"
            aria-hidden="false"
          ></i>
        </a>
      </li>
    </ul>
    <transition name="slide-fade">
      <div class="context-menu-container" v-show="showContextMenu">
        <ul class="context-menu">
          <li v-for="(item, index) in menuItens" :key="index">
            <h5 v-if="item.type === 'title'" class="context-menu__title">
              <i :class="item.icon" aria-hidden="true"></i>
              {{ item.txt }}
              <a
                v-if="index === 0"
                @click.prevent="closeContextMenu"
                class="context-menu__btn-close"
                href="#"
              >
                <i class="fa fa-window-close" aria-hidden="false"></i>
              </a>
            </h5>
            <a
              v-else
              @click="saveProject(item.txt)"
              :class="subMenuClass(item.txt)"
            >
              {{ item.txt }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import menuData from "./menu-data";
import kebabCase from "lodash/kebabCase";

export default {
  name: "Menu",

  data() {
    return {
      contextSection: "",
      menuItens: [],
      menuData: menuData,
      activeSubMenu: ""
    };
  },
  mounted: function () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "projects/setDownloadArchive") {
        this.forceFileDownload(this.$store.getters["projects/getDownloadArchive"]);
      }
    });
  },
  methods: {
    openProjectLink() {
      alert(
        "You could open the project frontend in another tab here, so the logged admin could see changes made to the project ;)"
      );
    },
    saveProject(action) {
      if(action==="Nuevo proyecto"){
        this.$router.push({
            path: `/newproject`,
        });
      }
      else if(action==="Guardar proyecto"){
        const payload=this.$route.params.name;
        this.$store.dispatch('projects/saveProject',payload)
      }
      else{
        this.$router.push({
            path: `/`,
        });
      }
    },
    updateMenu(context) {
      this.contextSection = context;
      this.menuItens = this.menuData[context];
    },
    forceFileDownload(data){
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${this.$route.params.name}.dat`)
      document.body.appendChild(link)
      link.click()
    },
    highlightSection(section) {
      return {
        menu__link: true,
        "menu__link--active": section === this.contextSection
      };
    },

    subMenuClass(subMenuName) {
      return {
        "context-menu__link": true,
        "context-menu__link--active": this.activeSubMenu === subMenuName
      };
    },

    closeContextMenu() {
      this.contextSection = "";
      this.menuItens = [];
    },

    openSection(item) {
      this.activeSubMenu = item.txt;
      this.$router.push(this.getUrl(item));
    },

    getUrl(item) {
      let sectionSlug = kebabCase(item.txt);
      return `${item.link}/${sectionSlug}`;
    }
  },
  computed: {
    showContextMenu() {
      return this.menuItens.length;
    }
  }
};
</script>
