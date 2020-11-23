<template>
    <v-card>
        <v-card-title>
            <span class="headline">Student Profile</span>
        </v-card-title>

        <v-card-text >
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.firstName" label="FirstName"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.lastName" label="LastName"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.dni" label="Dni"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.phone" label="Phone"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.gender" label="Gender"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.hobbies" label="Hobbies"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

        </v-card-text>
<!--        <v-card-actions>-->
<!--            <v-btn @click="goBack(item.id)">Back</v-btn>-->
<!--        </v-card-actions>-->
    </v-card>

</template>

<script>
    import ClientService from "@/services/clients-service"

    export default {
        name: "Client",
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
            /*goBack(id){
                this.$router.push({name: 'HomeApp', params: {id: id} });
            }*/
        },
        created() {
            this.getById(this.$route.params.id);
        }

    }
</script>

<style scoped>

</style>
