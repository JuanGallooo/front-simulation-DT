<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Create Project</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="project.name" label="Project Name" name="name" type="text"></v-text-field>
                  <label>Target System</label>
                  <v-row align="center" justify="center">
                    <v-col cols="4">
                      <label>Data Source</label>
                    </v-col>
                    <v-col cols="4">
                      <input type="radio" id="csv" name="csv" v-model="project.fuente" value="CSV" />
                      <label for="CSV">CSV</label>
                      <br />
                    </v-col>
                    <v-col cols="4">
                      <input
                        type="radio"
                        id="oracle"
                        name="oracle"
                        v-model="project.fuente"
                        value="Oracle"
                      />
                      <label for="oracle">Oracle</label>
                    </v-col>
                  </v-row>
                  <v-row justify="center" v-if="project.fuente=='CSV'">
                    <v-col cols="12">
                      <label>Upload Datagrams</label>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="primary" @click="showUpload = true; showSelect= false;">By file</v-btn>
                      <v-row align="center" v-if="showUpload">
                        <v-col cols="6">
                          <label>Separator</label>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field></v-text-field>
                        </v-col>
                      </v-row>
                      <UploadFiles v-if="showUpload"></UploadFiles>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        color="primary"
                        @click="showUpload = false; showSelect= true;"
                      >On Server</v-btn>
                      <v-select v-if="showSelect" :items="filesOnServer" label="Select Archive"></v-select>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row>
                  <v-col cols="12" align="center" justify="center">
                    <v-select :items="planversionID" label="PlanVersion ID"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" align="center" justify="center">
                    <v-menu
                      ref="menu"
                      v-model="initialMenu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="initialDate"
                          label="Initial Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="initialDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="initialMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.initialMenu.save(initialDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6" align="center" justify="center">
                    <v-menu
                      ref="menu"
                      v-model="finalMenu"
                      :close-on-content-click="false"
                      :return-value.sync="initialDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="finalDate"
                          label="Final Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="finalDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="finalMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.finalMenu.save(finalDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="space-around" align="center">
                  <v-col cols="6" align="center" justify="center">
                    <v-time-picker v-model="picker" scrollable></v-time-picker>
                  </v-col>
                  <v-col cols="6" align="center" justify="center">
                    <v-time-picker v-model="pickerTwo" scrollable></v-time-picker>
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-col align="center" cols="12" md="6" sm="6">
                    <div class="my-3">
                      <v-btn color="primary" router :to="{path:'/variables'}">Create Project</v-btn>
                    </div>
                    <div class="my-3">
                      <v-btn color="primary" router :to="{path:'/newproject'}">Go Back</v-btn>
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
import UploadFiles from "../UploadFile/UploadFile";
export default {
  data: () => ({
    project: {
      name: "",
      fuente: 0,
    },
    planversionID: ["Nada", "Nada2"],
    filesOnServer: ["Nada", "Nada"],
    initialDate: new Date().toISOString().substr(0, 7),
    finalDate: new Date().toISOString().substr(0, 7),
    initialMenu: false,
    finalMenu: false,
    InitialTimePicker: null,
    FinalTimePicker: null,
    showUpload: false,
    showSelect: false,
  }),
  components: {
    UploadFiles,
  },
  mounted: function () {
    // Load the planversions id
  },
  methods: {
    createProject: function (event) {},
    loadPlanVersions: function (event) {},
  },
};
</script>

<style>
</style>
