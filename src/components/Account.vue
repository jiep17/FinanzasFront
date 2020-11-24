<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container>
        <v-row justify="space-around">
          <v-card width="600" color="green">
            <v-card-text>
              <div class="font-weight-bold ml-8 mb-10">
                <h1 class="display-1">Detail</h1>
              </div>
              <div>
                <div class="font-weight-normal">
                  <strong> Credito Usado:</strong> {{ item.usedCredit }}
                </div>
              </div>
              <div>
                <div class="font-weight-normal">
                  <strong> Credito Disponible:</strong> {{ item.availableCredit }}
                </div>
              </div>
              <div>
                <div class="font-weight-normal">
                  <div class="font-weight-normal">
                    <strong> Porcentaje: </strong> {{ item.porcentaje }}%
                  </div>
                  <div class="font-weight-normal">
                    <strong> Date: </strong> {{ item.date }}
                  </div>
                  <div class="font-weight-normal">
                    <strong> Tipo Tasa: </strong> {{ item.name }}
                  </div>
                </div>
              </div>
              <div>
                <div class="font-weight-normal">
                  <strong> Tipo de moneda: </strong> {{ item.symbol }}
                </div>
              </div>
              <div class="font-weight-bold ml-8 mb-2 ">
                Periodo:  {{ item.periodtype }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  class="mx-2"
                  dark
                  color="red"
                  @click="back">
                <v-icon>mdi-history</v-icon>
              </v-btn>
              <v-btn
                  class="mx-2"
                  dark
                  large
                  color="cyan"
                  @click="navigateToEditAccount()">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn class="btn" @click="goToTransaction(item.id)">
                Transactions
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountService from '../services/account-service';
import Header from "@/pages/Header";
export default {
  name: "account",
  components: {Header},
  data() {
    return {
      item: {
        usedCredit: '',
        availableCredit: '',
        porcentaje: '',
        date: '',
        name: '',
        symbol: '',
        periodtype: '',
        id: ''
      },
      item1: {}
    }
  },
  methods: {
    getById(id){
      AccountService.get(id)
          .then((response) => {
            this.item1 = response.data;
            this.createItem();
            // To print data
            console.log('this.item', this.item1)
          })
          .catch(e=> {
            console.log(e);
          })
    },
    createItem(){
      this.item.usedCredit= this.item1.usedCredit;
      this.item.availableCredit=this.item1.availableCredit;
      this.item.porcentaje=this.item1.fee.percentage;
      this.item.date=this.item1.fee.date;
      this.item.name=this.item1.fee.feeType.name;
      this.item.symbol=this.item1.currency.code;
      this.item.periodtype=this.item1.period.type;
      this.item.id= this.item1.id;
    },
    back(){
      this.$router.push({name: 'Client', params: { id: this.$route.params.clientId}});
    },
    navigateToEditAccount() {
      this.$router.push({name: 'edit-account', params: { clientId: this.$route.params.clientId }});
    },
    goToTransaction(id){
      this.$router.push({ name: 'transaction', params: { id: id} });
    }
  },
  created(){
    this.getById(this.$route.params.clientId);
  }
}
</script>

<style scoped>
</style>
