<template>
    <v-card>
        <v-card-title>
            Transactions
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="displayTransactions" :items-per-page="5" :search="search"
                          class="elevation-1" ref="transactionTable">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="navigateToEditTransaction(item.id)">mdi-pen</v-icon>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-btn small color="primary" @click="navigateToAddTransaction">Add Transaction</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import TransactionService from "@/services/transaction-service";
    export default {
        name: "Transaction",
        data() {
            return {
                search: '',
                dialog: false,
                dialogDelete: false,
                headers: [
                    {text: 'Id', value: 'id'},
                    {text: 'Description', value: 'description'},
                    {text: 'Address', value: 'address'},
                    {text: 'Name', value: 'name'},
                    {text: 'Actions', value: 'actions', sortable: false}
                ],
                transactions: [],
                displayTransactions: [],
                defaultItem: {
                    id: 0,
                    description: '',
                    address: '',
                    name: ''
                },
            }
        },
        methods: {
            retrieveTransactions() {
                TransactionService.getAll()
                    .then(response => {
                        this.transactions = response.data;
                        this.displayTransactions = response.data.map(this.getDisplayTransaction);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },

            getDisplayTransaction(transaction) {
                return {
                    id: transaction.id,
                    description: transaction.description,
                    address: transaction.address,
                    name: transaction.lessor.firstName,
                };
            },
            // refreshList() {
            //     this.retrieveTransactions();
            // },
            navigateToAddTransaction() {
                this.$router.push({name: 'add-transaction'});
            },
            navigateToEditTransaction(id) {
                this.$router.push({name: 'edit-transaction', params: { id: id}});
            }
        },
        mounted() {
            this.retrieveTransactions();
        }

    }
</script>

<style scoped>

</style>
