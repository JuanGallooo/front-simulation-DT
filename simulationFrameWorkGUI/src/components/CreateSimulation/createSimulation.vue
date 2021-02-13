<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Crear simulación</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  v-model="project.name"
                  label="Nombre del proyecto"
                  name="name"
                  type="text"
                ></v-text-field>
                <v-row>
                  <v-col cols="6" align="center" justify="center">
                    <v-menu
                      ref="menu"
                      v-model="initialMenu"
                      :close-on-content-click="false"
                      :return-value.sync="initialMenu"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="initialDate"
                          label="Fecha inicial"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="initialDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="initialMenu = false"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.initialMenu.save(initialDate)"
                          >Aceptar</v-btn
                        >
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
                          label="Fecha final"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="finalDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="finalMenu = false"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.finalMenu.save(finalDate)"
                          >Aceptar</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="space-around" align="center">
                  <v-col cols="6" align="center" justify="center">
                    <v-time-picker
                      v-model="InitialTimePicker"
                      full-width
                      scrollable
                      class="ml-3"
                    ></v-time-picker>
                  </v-col>
                  <v-col cols="6" align="center" justify="center">
                    <v-time-picker
                      v-model="FinalTimePicker"
                      full-width
                      scrollable
                      class="ml-3"
                    ></v-time-picker>
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-col align="center" cols="12" md="6" sm="6">
                    <div class="my-3">
                      <v-btn color="primary" router @click="saveProject"
                        >Crear simulación</v-btn
                      >
                    </div>
                    <div class="my-3">
                      <v-btn color="primary" router :to="{ path: '/' }"
                        >Volver</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">
                ¿Cual es el head way diseñado para esta simulación en minutos?
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="headway"
                  label="HeadWay"
                  name="name"
                  type="number"
                  min="1"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="startSimulation()">
                  Empezar simulación
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogTwo: false,
    project: {
      name: "",
      fuente: 0
    },
    initialDate: "",
    finalDate: "",
    InitialTimePicker: null,
    FinalTimePicker: null,
    headway: null,
    initialMenu: null,
    finalMenu: null,
    dataSimulation: "",
    picker: null
  }),
  mounted: function() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "projects/setCreateSimulationFlag") {
        if (this.$store.getters["projects/getCreateSimulationFlag"]) {
          this.dialog = true;
        }
      }
      if (mutation.type === "projects/setStartSimulation") {
        this.dialog = false;
        // this.dataSimulation= this.$store.getters["projects/getSimulationData"];
        // this.dialogTwo= true;
        this.$router.push({
          path: `/simulation/${this.project.name}`,
          query: {headway:this.headway}
        });
      }
    });
  },
  methods: {
    saveProject: function() {
      let payload = {
        name: this.project.name,
        initialDate: this.initialDate + " " + this.InitialTimePicker + ":00",
        finalDate: this.finalDate + " " + this.FinalTimePicker + ":00"
      };
      console.log(payload)
      this.$store.commit("projects/setProjectNameSeleted", this.project.name);
      this.$store.dispatch("projects/createSimulation", payload);
    },
    startSimulation: function() {
      let payload = {
        headway: this.headway,
        projectName: this.$store.getters["projects/getProjectNameSeleted"]
      };
      console.log(payload);
      this.$store.dispatch("projects/startSimulation", payload);
    }
  }
};
</script>

<style></style>
