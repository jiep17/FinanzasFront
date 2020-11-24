<template>
  <v-toolbar color="white" flat class="mt-0 elevation-4">
    <v-toolbar-title>
      <v-btn text @click="goToAddClient()">Add Client</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text @click="goToClients()">Clients</v-btn>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
export default {
name: "Header",
  data() {
    return {

    }
  },
  methods: {
    goToClients(){
      this.$router.push({name: 'Clients'});
    },
    goToAddClient(){
      this.$router.push(({name: 'AddClient'}));
    }
  }
}
</script>

<style scoped>

</style>
