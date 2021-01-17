<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <div class="clock">
            <p class="date">{{ date }}</p>
            <p class="time">{{ time }}</p>
          </div>
          <div>

          </div>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <div class="flex-row">
                  Headway Designed
              </div>
              <div class="d-flex justify-center">
                <div class="buses">
                  {{ headway }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="flex-row">
                  Número de buses en total
              </div>
              <div class="d-flex justify-center">
                <div class="buses">
                  {{ totalBuses }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="4">
          <v-card class="pa-2 card" outlined tile>
            <div class="d-flex flex-column align-self-md-center">
              <div class="d-flex justify-center flex-row">
                <p class="stop">Flora industrial</p>
              </div>
              <div class="d-flex flex-column">
                <div class="flex-row">
                  Número de pasajeros en cola
                </div>
                <div class="d-flex justify-center">
                  <div class="passengers">
                    {{ passengersOne }}
                  </div>
                </div>
              </div>
              <div class="d-flex justify-center flex-row">
                <div class="align-self-center">
                  <p>Estado:</p>
                </div>
                <div v-if="stateOne">
                  <p class="waiting">Espera...</p>
                </div>
                <div v-else>
                  <p class="boarding">Abordando</p>
                </div>
              </div>
              <div class="d-flex justify-center flex-row">
                <!-- <v-img v-if="waitingBusesOne"
                  max-height="500"
                  max-width="250"
                  src="src/assets/BusMio.gif"
                ></v-img>
                <v-img v-else
                  max-height="500"
                  max-width="250"
                  src="src/assets/WaitingPeople.jpg"
                ></v-img> -->
              </div>
              <div class="d-flex flex-column">
                <div class="flex-row">
                  Número de buses en cola
                </div>
                <div class="d-flex justify-center">
                  <div class="buses">
                    {{ busesOne }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2 card" outlined tile>
            <div class="d-flex flex-column align-self-md-center">
              <div class="d-flex justify-center flex-row">
                <p class="stop">Vía</p>
              </div>
              <div class="d-flex justify-center flex-row">
                <!-- <v-img
                  max-height="500"
                  max-width="250"
                  src="src/assets/Street.gif"
                ></v-img> -->
              </div>
              <div class="d-flex flex-column">
                <div class="flex-row">
                  Número de buses en vía
                </div>
                <div class="d-flex justify-center">
                  <div class="buses">
                    {{ busesTwo }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2 card" outlined tile>
            <div class="d-flex flex-column align-self-md-center">
              <div class="d-flex justify-center flex-row">
                <p class="stop">Salomia</p>
              </div>
              <div class="d-flex flex-column">
                <div class="flex-row">
                  Número de pasajeros en cola
                </div>
                <div class="d-flex justify-center">
                  <div class="passengers">
                    {{ passengersTwo }}
                  </div>
                </div>
              </div>
              <div class="d-flex justify-center flex-row">
                <div class="align-self-center">
                  <p>Estado:</p>
                </div>
                <div v-if="stateTwo">
                  <p class="waiting">Espera...</p>
                </div>
                <div v-else>
                  <p class="boarding">Abordando</p>
                </div>
              </div>
              <div class="d-flex justify-center flex-row">
                <!-- <v-img v-if="waitingBusesTwo"
                  max-height="500"
                  max-width="250"
                  src="src/assets/BusMio.gif"
                ></v-img>
                <v-img v-else
                  max-height="500"
                  max-width="250"
                  src="src/assets/WaitingPeople.jpg"
                ></v-img> -->
              </div>
              <div class="d-flex flex-column">
                <div class="flex-row">
                  Número de buses en cola
                </div>
                <div class="d-flex justify-center">
                  <div class="buses">
                    {{ busesThree }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
          <v-dialog v-model="dialogTwo" persistent max-width="650px">
            <v-card>
              <v-card-title class="headline">
                Resultado de la simulación
              </v-card-title>
              <v-card-text>
                <div v-for="a in dataSimulation" :key="a">
                  {{ a }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialogTwo = false">
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
    </v-container>
  </div>
</template>

<script>
function zeroPadding(num, digit) {
  var zero = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}
export default {
  name: "simulation",
  data() {
    return {
      stateOne: false,
      waitingBusesOne: true,
      stateTwo: true,
      waitingBusesTwo: false,
      inter: null,
      passengersOne: null,
      passengersTwo: null,
      busesOne: null,
      busesTwo: null,
      busesThree: null,
      date: null,
      time: null,
      headway: null,
      totalBuses: null,
      dataSimulation: null,
      dialogTwo: false
    };
  },
  mounted: function() {
    this.inter = setInterval(() => {
      let payload = {
        projectName: this.$route.params.name
      };
      this.getNextInterval();
      this.$store.dispatch("projects/nextInterval", payload);
    }, 500);
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "projects/setNextInterval") {
        const dataM = this.$store.getters["projects/getNextInterval"];
        this.passengersOne = dataM.usersFloraInd;
        this.passengersTwo = dataM.usersSalomia;
        this.busesOne = dataM.busesFloraInd;
        if(this.busesOne>0){
          this.stateOne= false;
        }
        else{
          this.stateOne= true;
        }
        this.busesTwo = dataM.busesRoad;
        this.busesThree = dataM.busesSalomia;
        if(this.busesThree>0){
          this.stateTwo= false;
        }
        else{
          this.stateTwo= true;
        }
        this.headway= dataM.headwayDesigned;
        this.totalBuses= dataM.numberOfBuses;
        const week = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado"
        ];
        var cd = new Date(dataM.date);
        console.log(cd.toLocaleTimeString())
        this.time =
          zeroPadding(cd.getHours(), 2) +
          ":" +
          zeroPadding(cd.getMinutes(), 2) +
          ":" +
          zeroPadding(cd.getSeconds(), 2);
        this.date =
          zeroPadding(cd.getFullYear(), 4) +
          "-" +
          zeroPadding(cd.getMonth() + 1, 2) +
          "-" +
          zeroPadding(cd.getDate(), 2) +
          " " +
          week[cd.getDay()];
        this.dataSimulation= [
          dataM.excessWaitingTime,
          dataM.headwayCoefficientOfVariation,
          dataM.maxUsersFloraInd,
          dataM.maxUsersFloraIndDate,
          dataM.maxUsersSalomia,
          dataM.maxUsersSalomiaDate,
          dataM.maxbusFloraInd,
          dataM.maxbusSalomia,
          dataM.meanHOBusFloraInd,
          dataM.meanHOBusSalomia,
          dataM.meanHOUsersFloraInd,
          dataM.meanHOUsersSalomia,
          dataM.passengerSatisfaction
        ]
      }
    });
  },
  methods: {
    getNextInterval: function() {
      let payload = {
        projectName: this.$route.params.name
      };
      this.$store.dispatch("projects/nextInterval", payload);
    },
  }
};
</script>

<style></style>
