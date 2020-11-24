<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-card>
        <v-card-title>
          <span class="headline">Client Profile</span>
        </v-card-title>

        <v-card-text >
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.name" label="FirstName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.lastName" label="LastName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.dni" label="Dni"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.phoneNumber" label="Phone Number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.address" label="Gender"></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-btn class="btn" @click="goToAccount(item.dni)">
            Account Detail
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import ClientService from "@/services/clients-service"
import Header from "@/pages/Header";

export default {
  name: "Client",
  components: {Header},
  data() {
    return{
      item: {}
    }
  },
  methods: {
    getById(id){
      ClientService.getById(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },
    goToAccount(id){
      this.$router.push({ name: 'Account', params: { clientId: id} });
    }
  },
  created() {
    this.getById(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
