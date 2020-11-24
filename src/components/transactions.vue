<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container fluid>
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
            <v-btn class="mx-2" fab dark color="green" @click="navigateToAddTransaction()">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark color="green" @click="navigateToAccount()">
              <v-icon>mdi-history</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import TransactionService from "@/services/transaction-service";
import Header from "@/pages/Header";
export default {
  name: "Transaction",
  components: {Header},
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Date', value: 'date'},
        {text: 'Description', value: 'description'},
        {text: 'Amount', value: 'amount'},
        {text: 'Name', value: 'name'},
        {text: 'Payed', value: 'payed'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      transactions: [],
      ids: '',
      displayTransactions: [],
      defaultItem: {
        date: '',
        description: '',
        amount: 0,
        name: '',
        payed: '',
        id: 0
      },
    }
  },
  methods: {
    retrieveTransactions(id) {
      TransactionService.getAll(id)
          .then(response => {
            this.transactions = response.data;
            this.displayTransactions = response.data.map(this.getDisplayTransaction);
            console.log('this.item', this.transactions)
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayTransaction(transaction) {
      return {
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        name: transaction.transactionType.name,
        payed: transaction.payed ? "Si" : "No",
        id: transaction.id
      };
    },
    navigateToAddTransaction() {
      this.$router.push({name: 'add-transaction', params: { accountId: this.$route.params.id }});
    },
    navigateToPayTransaction() {
      this.$router.push({name: 'pay-transaction', params: { accountId: this.$route.params.id }});
    },
    navigateToEditTransaction(id) {
      this.$router.push({name: 'edit-transaction', params: { accountId: this.$route.params.id, id: id}});
    },
    navigateToAccount(){
      this.$router.back();
    }
  },
  created() {
    this.retrieveTransactions(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
