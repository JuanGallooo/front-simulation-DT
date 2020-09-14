<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Variables</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="mx-auto" width="400" tilde>
            <v-radio-group>
              <div v-for="item in items" :key="item">
                <input
                  type="checkbox"
                  :id="item.text"
                  :name="item.text"
                  v-model="itemSelected"
                  :value="item.text"
                />
                <label>{{item.text}}</label>
              </div>
            </v-radio-group>

            <v-row align="center" justify="center">
              <v-col align="center" cols="12" md="6" sm="6">
                <div class="my-3">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">Edit variables</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit Variables</span>
                      </v-card-title>
                      <v-card-text>
                        <div v-for="index in itemSelected.length" :key="index">
                          <v-text-field
                            :v-model="itemSelected[index-1]"
                            :value="itemSelected[index-1]"
                          ></v-text-field>
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <div class="my-3">
                  <v-btn color="primary" router :to="{path:'/systemvariables'}">Assign variables</v-btn>
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
</template>

<script>
export default {
  data: () => ({
    itemSelected: [],
    items: [
      { text: "BusID" },
      { text: "datagramDate" },
      { text: "LineID" },
      { text: "Longitud" },
      { text: "Latitud" },
    ],
    dialog: false,
  }),
};
</script>
