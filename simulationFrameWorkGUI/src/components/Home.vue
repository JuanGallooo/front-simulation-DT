<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <!-- <v-toolbar-title>Home </v-toolbar-title> -->
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <div class="my-3">
                  <img
                    width="400"
                    height="350"
                    src="../assets/canvaLogo.png"
                    alt=""
                  />
                </div>

                <v-row align="center" justify="center">
                  <v-col align="center" cols="12" md="6" sm="6">
                    <div class="my-3">
                      <label v-if="showHandle"
                        >Por favor cargar archivo
                        <input
                          type="file"
                          id="file"
                          ref="file"
                          v-on:change="handleFileUpload()"
                        />
                      </label>
                      <v-btn
                        color="primary"
                        block
                        v-on:click="handleFileUpload()"
                        >Subir proyecto</v-btn
                      >
                    </div>
                    <form
                      enctype="multipart/form-data"
                      novalidate
                      v-if="isInitial || isSaving"
                    >
                      <h1>Upload images</h1>
                      <div class="dropbox">
                        <input
                          type="file"
                          multiple
                          :name="uploadFieldName"
                          :disabled="isSaving"
                          @change="
                            filesChange(
                              $event.target.name,
                              $event.target.files
                            );
                            fileCount = $event.target.files.length;
                          "
                          accept="image/*"
                          class="input-file"
                        />
                        <p v-if="isInitial">
                          Drag your file(s) here to begin<br />
                          or click to browse
                        </p>
                        <p v-if="isSaving">
                          Uploading {{ fileCount }} files...
                        </p>
                      </div>
                    </form>
                    <div class="my-3">
                      <v-btn block color="primary" @click="showSelect = true"
                        >Buscar proyecto</v-btn
                      >
                      <div v-if="showSelect">
                        <v-select
                          v-if="showSelect"
                          @change="loadProject"
                          v-model="projectSelected"
                          :items="filesOnServer"
                          label="Seleccionar Archivo"
                        ></v-select>
                      </div>
                    </div>
                    <div class="my-3">
                      <v-btn
                        block
                        color="primary"
                        router
                        :to="{ path: '/newproject' }"
                        >Crear visualización</v-btn
                      >
                    </div>
                    <div class="my-3">
                      <v-btn
                        block
                        color="primary"
                        router
                        :to="{ path: '/newsimulation' }"
                        >Crear simulacion</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isInitial: false,
      isSaving: false,
      file: "",
      showSelect: false,
      showHandle: false,
      filesOnServer: [],
      archiveSelected: null,
      projectSelected: null
    };
  },
  mounted: function() {
    this.$store.dispatch("projects/projectsNames", null);
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "projects/setProjectsNames") {
        this.filesOnServer = this.$store.getters["projects/getProjectNames"];
      }
      if (mutation.type === "projects/setUploadStatus") {
        alert(
          "Proyecto subido con éxito, busca en los proyectos para cargar la visualización"
        );
      }
      if (mutation.type === "projects/setLoadInfo") {
        const project = this.$store.getters["projects/getLoadInfo"];
        console.log(project.planVersionId)
        this.$router.push({
          path: `/canvas/${project.name}`,
          query: {
            planversion: project.planVersionId,
            type: project.fileType
          }
        });
      }
    });
  },
  methods: {
    handleFileUpload() {
      if (this.showHandle == false) {
        this.showHandle = true;
      } else {
        this.file = this.$refs.file.files[0];
        this.$store.dispatch("projects/uploadProject", this.file);
      }
    },
    loadProject() {
      const payload = {
        projectName: this.projectSelected.substring(0,this.projectSelected.length-4)
      };
      console.log(payload)
      this.$store.dispatch("projects/loadProject", payload);
    }
  }
};
</script>

<style></style>
