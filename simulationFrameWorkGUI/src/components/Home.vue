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
                  <img  width="400" height="350"
                    src= "../assets/canvaLogo.png" alt=""
                  >
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
                      <v-btn color="primary" block v-on:click="handleFileUpload()"
                        >Cargar Proyecto</v-btn
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
                      <v-btn block
                        color="primary"
                        @click="showSelect= true;"
                      >En servidor</v-btn>
                      <div v-if="showSelect">
                      <v-select v-if="showSelect" v-model="archiveSelected" :items="filesOnServer" label="Seleccionar Archivo"></v-select>
                      </div>
                    </div>
                    <div class="my-3">
                      <v-btn block
                        color="primary"
                        router
                        :to="{ path: '/newproject' }"
                        >Crear Proyecto</v-btn
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
      showSelect:false,
      showHandle: false,
      filesOnServer: [],
      archiveSelected:null
    };
  },
  mounted: function () {
    if(this.$store.getters['projects/getAllFileNames'].length==0){
      this.$store.dispatch('projects/loadAllFilesNames')
    }else{
      this.filesOnServer=this.$store.getters['projects/getAllFileNames']
    }
  },
  methods: {
    handleFileUpload() {
      if (this.showHandle == false) {
        this.showHandle = true;
      } else {
        this.file = this.$refs.file.files[0];
        this.$store.dispatch("projects/uploadProject", this.file);
      }
    }
  }
};
</script>

<style></style>
