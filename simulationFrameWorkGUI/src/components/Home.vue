<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Home </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <v-row align="center" justify="center">
                      <v-col align="center" cols="12" md="6" sm="6">
                        <div class="my-3">
                            <v-btn color="primary">Upload Project</v-btn>
                        </div>
                        <div class="my-3">
                            <v-btn color="primary" router :to="{path:'/newproject'}">Create Project</v-btn>
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

}
</script>

<style>

</style>