<template>
  <v-app>
    <v-main>
      <Header></Header>
      <div id="app">
        <v-app id="inspire">
          <v-item-group active-class="primary">
            <v-container>
              <v-row>
                <v-col
                    v-for="item in items"
                    :key="item.id"
                    cols="12"
                    md="4"
                    class="border_all"
                >
                  <v-item>
                    <v-card
                        class="mx-auto d-flex flex-column elevation-10"
                        max-width="400"
                    >
                      <v-img
                          height="250"
                          :src="image"
                      ></v-img>

                      <v-card-title class="align-self-center card-title">{{ item.name }} {{ item.lastName }}</v-card-title>
                      <v-card-text class="card-text">
                        <v-row align="center">
                          <v-col cols="4">
                            <h3>DNI</h3>
                            <p class="student-card mt-2">{{item.dni}}</p>
                          </v-col>
                          <v-col>
                            <h3>ADDRESS</h3>
                            <p class="student-card mt-2">{{item.address}}</p>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions class="d-flex flex-column mb-2">
                        <v-btn class="btn" @click="goToProfile(item.dni)">
                          Know more about me
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-app>
      </div>
    </v-main>
  </v-app>

</template>

<script>

import Header from "@/pages/Header";
import ClientsService from "@/services/clients-service";

export default {
name: "Clients",
  components: {Header},
  data() {
    return {
      image: require("@/assets/roomate.jpg"),
      items: [],
      item:{}
    }
  },
  methods:{
    getClients(){
      ClientsService.getAll()
          .then((response)=>{
            this.items = response.data;
            console.log('this.item',this.items);
          })
          .catch(e=>{
            console.log(e);
          })
    },
    goToProfile(id){
      this.$router.push({name: 'Client', params: {id: id} });
    },
  },
  created() {
    this.getClients();
  }
}
</script>

<style scoped>
h2{
  font-family: "Comic Sans MS";
  font-weight: bold;
}
p{
  font-family: "Comic Sans MS";
  font-size: 18px;
}
.card-title{
  font-family: "Comic Sans MS";
  font-size: 30px;
}

.btn{
  background-color: darkgrey !important;
  color: white;
}

.card-text{
  width: auto;
  padding: 5px;
  margin: 0 20px 10px 20px;
  border-top: .05rem solid #d1d1d1;
  border-bottom: .05rem solid #d1d1d1;
}
</style>
