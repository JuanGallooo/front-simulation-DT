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
            <h5> Por favor seleccione las variables que desea ver en la simulación</h5>
            <v-row align="center" justify="center">
                <v-radio-group >
                  <div v-for="item in items" :key="item">
                    <input
                      type="checkbox"
                      :id="item"
                      :name="item"
                      v-model="itemSelected"
                      :value="item"
                    />
                    <label>{{item}}</label>

                  </div>
                </v-radio-group>
            </v-row>

            <v-row align="center" justify="center">
              <v-col align="center" cols="12" md="6" sm="6">
                <div class="my-3">
                  <v-btn @click="setHeaders" color="primary" router> Next</v-btn>
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
    items: [],
    dialog: false,
  }),

  created: function(){

    let payload = {
      projectName: this.$store.getters['projects/getProjectNameSeleted']
    }

    if(this.$store.getters['variables/getAllVariables'].length==0){
      this.$store.dispatch('variables/loadAllVariables',payload)
    }else{
      this.items=this.$store.getters['variables/getAllVariables']
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'variables/setVariablesStates') {
        this.items=this.$store.getters['variables/getAllVariables']
      }
    })
  },

  methods: {

    loadAllVariables: function (event){
      this.$store.dispatch('variables/loadAllVariables',payload)
    },

    setHeaders: function(){
      console.log("Entro al metodo setHeaersInBack")
      let payload= {
        projectName: this.$store.getters["projects/getProjectNameSeleted"],
        headersSelected: this.itemSelected
      }
      console.log(payload)
      this.$store.dispatch('variables/setVariablesInBack',payload)


      //this.$router.push('/canvas');

    }
  }
};
</script>
