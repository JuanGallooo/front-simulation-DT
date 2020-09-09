<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title> Variables </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="mx-auto" width="400" tilde>

                <v-container >
                  <v-list-item-group v-model="item" >
                    <v-list-item v-for="(item, i) in items" :key="i">

                      <v-list-item-content>

                        <v-list-item-title v-text="item.text" > <v-checkbox v-model="selected"></v-checkbox></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-container>


                <v-row align="center" justify="center">
                  <v-col align="center" cols="12" md="6" sm="6">
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
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      item: 0,
      items: [
        { text: 'BusID' },
        { text: 'datagramDate' },
        { text: 'LineID'},
      ],
      selected: ['John'],
    }),
  }
</script>
