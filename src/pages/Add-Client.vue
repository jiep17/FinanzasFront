<template>
  <v-app>
    <v-main>
      <v-card class="mt-6 ml-12 mr-12 elevation-12">
        <v-card-title>
          <span class="headline">Add Client: Please enter the information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.dni" label="Dni"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.lastName" label="Last Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.birthdate" label="Birthdate yyyy-mm-dd"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.phoneNumber" label="Phone"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.address" label="Address"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card class="mt-6 ml-12 mr-12 elevation-12">
        <v-card-title>
          <span class="headline">Add Account: Please enter the new account information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="account.availableCredit" label="Available Credit"></v-text-field>
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
      </v-card>
      <v-card class="mt-6 ml-12 mr-12 elevation-12">
        <v-card-title>
          <span class="headline">Add fee: Please enter the fee details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="fee.percentage" label="Percentage"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="feeTypes" v-model="feeType.name" label="Fee Types" v-on:change="lookForFeeType()"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Create client</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>

</template>

<script>


import ClientsService from "@/services/clients-service";
import PeriodService from "@/services/period-service";
import CurrencyService from "@/services/currency-service";
import FeeTypeService from "@/services/feeType-service";
import FeeService from "@/services/fee-service";
import AccountService from "@/services/account-service";

export default {
  name: "Add-Client",
  data() {
    return {
      item: {
        dni: '',
        name: '',
        lastName: '',
        birthdate: '',
        phoneNumber: '',
        address: ''
      },
      account: {
      },
      fee: {
        percentage: 0,
        feeTypeId: 0
      },

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
    save() {
      this.saveClient();
    },
    saveClient(){
      ClientsService.create(this.item)
          .then(() => {
            console.log(this.item);
          })
          .catch(e => {
            console.log(e);
          })
      this.saveAccount();
    },
    saveAccount(){
      this.account.usedCredit = 0;
      let id = this.item.dni;
      let account = this.account;
      account.availableCredit = Number(this.account.availableCredit);

      AccountService.create(id,account)
          .then((response) => {
            this.saveFee(response.data.id);
          })
          .catch(e => {
            console.log(e);
          })
    },
    saveFee(id){
      let fee = this.fee;
      fee.percentage = Number(this.fee.percentage);
      FeeService.create(id,fee)
          .then(() => {
            console.log(fee);
            this.close();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToClients();
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
    getAllFeeTypes(){
      FeeTypeService.getAll()
          .then((response)=>{
            this.feeTypeItems = JSON.parse(JSON.stringify(response.data));
            this.feeTypeItems.forEach((a)=>{
              this.feeTypes.push(a.name);
            })
          })
    },

    lookForCurrency(){
      this.currencyItems.forEach(
          (a)=>{
            if(this.currency.code === a.code)
              this.currency.id = a.id;
              this.account.currencyId = a.id;
          }
      )
      console.log(this.currency.id);
    },
    lookForPeriod(){
      this.periodItems.forEach(
          (a)=>{
            if(this.period.type === a.type)
              this.period.id = a.id;
              this.account.periodId = a.id;
          }
      )
      console.log(this.period.id);
    },
    lookForFeeType(){
      this.feeTypeItems.forEach(
          (a)=>{
            if(this.feeType.name === a.name)
              this.feeType.id = a.id;
              this.fee.feeTypeId = a.id;
          }
      )
      console.log(this.feeType.id);
    },
    navigateToClients() {
      this.$router.push({name: 'Clients'})
    },
  },
  created() {
    this.getAllCurrencies();
    this.getAllPeriods();
    this.getAllFeeTypes();
  }
}
</script>

<style scoped>

</style>
