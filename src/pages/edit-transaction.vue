<template>
    <v-card>
        <v-card-title>
            <span class="headline">Edit Transaction</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.date" label="Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.amount" label="Amount"></v-text-field>
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
        name: "edit-transaction",
        data() {
            return {
                item: {
                   transactionTypeId: 1
                },
                accountIdS : ''
            }
        },
        methods: {
            retrieveTransaction(accountId, id) {
                this.accountIdS= accountId;
                TransactionService.get(accountId, id)
                    .then((response) => {
                        this.item = response.data;
                        console.log('this.item', this.item)
                    })
                    .catch(e => {
                        console.log((e));
                    })
            },
            save() {
                let transaction = this.item;
                transaction.amount=Number(this.item.amount);
                TransactionService.update(this.accountIdS,this.item.id, transaction)
                    .then(() => {
                        this.navigateToTransaction();
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            close() {
                this.navigateToTransaction();
            },
            navigateToTransaction() {
                this.$router.push({name: 'transaction', params: { id:this.$route.params.accountId }});
            }
        },
        created() {
            this.retrieveTransaction(this.$route.params.accountId,this.$route.params.id );
        }
    }
</script>

<style scoped>

</style>
