<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Transaction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.usedCredit" label="Credito Usado"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.availableCredit" label="Credito Disponible"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select :items="currencies" v-model="currency.code" label="Currencies" v-on:change="lookForCurrency()"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select :items="periods" v-model="period.type" label="Periods" v-on:change="lookForPeriod()"></v-select>
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
    </v-main>
  </v-app>

</template>

<script>
import AccountService from "@/services/account-service";
import CurrencyService from "@/services/currency-service";
import PeriodService from "@/services/period-service";

export default {
  name: "edit-account",
  data() {
    return {
      item: {
        usedCredit: '',
        availableCredit: '',
        currency: '',
        period: '',
      },
      itemS: {},
      dniC: '',

      currencyItems: [],
      currencies: [],
      currency:{},

      periodItems: [],
      periods: [],
      period:{},

      feeTypeItems: [],
      feeTypes: [],
      feeType: {}
    }
  },
  methods: {
    retrieveAccount(id) {
      this.dniC= id;
      AccountService.get(id)
          .then((response) => {
            this.itemS = response.data;
            this.createItem();
            console.log('this.item', this.item)
          })
          .catch(e => {
            console.log((e));
          })
    },
    createItem(){
      this.item.usedCredit=this.itemS.usedCredit;
      this.item.availableCredit=this.itemS.availableCredit;
      this.item.currency=this.itemS.currency.id;
      this.item.period=this.itemS.period.id;
    },
    save() {
      let item = this.item;
      item.availableCredit = Number(this.item.availableCredit);
      AccountService.update(this.dniC, item)
          .then(() => {
            this.navigateToAccount();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToAccount();
    },
    navigateToAccount() {
      this.$router.push({name: 'Account'});
    },
    getAllCurrencies(){
      CurrencyService.getAll()
          .then((response)=>{
            this.currencyItems = JSON.parse(JSON.stringify(response.data));
            this.currencyItems.forEach((a)=>{
              this.currencies.push(a.code);
            })
          })
    },
    getAllPeriods(){
      PeriodService.getAll()
          .then((response)=>{
            this.periodItems = JSON.parse(JSON.stringify(response.data));
            this.periodItems.forEach((a)=>{
              this.periods.push(a.type);
            })
          })
    },
    lookForCurrency(){
      this.currencyItems.forEach(
          (a)=>{
            if(this.currency.code === a.code) {
              this.currency.id = a.id;
              this.item.currencyId = a.id;
            }
          }
      )
      console.log(this.item.currencyId);
    },
    lookForPeriod(){
      this.periodItems.forEach(
          (a)=>{
            if(this.period.type === a.type) {
              this.period.id = a.id;
              this.item.periodId = a.id;
            }
          }
      )
      console.log(this.item.periodId);
    }
  },
  created() {
    this.retrieveAccount(this.$route.params.clientId);
    this.getAllCurrencies();
    this.getAllPeriods();
  }
}
</script>

<style scoped>

</style>
