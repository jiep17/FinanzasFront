<template>
    <v-card>
        <v-card-title>
            <span class="headline">Add Transaction</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.description" label="Address"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import TransactionService from "@/services/transaction-service";
    export default {
        name: "add-transaction",
        data(){
            return {
                item: {}
            }
        },
        methods: {
            save() {
                TransactionService.create(this.item)
                .then(() => {
                    this.navigateToTransaction();
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            close() {
                this.navigateToTransaction();
            },
            navigateToTransaction(){
                this.$router.push('/transactions')
            }
        }
    }
</script>

<style scoped>

</style>
