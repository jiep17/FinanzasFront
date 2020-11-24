<template>
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
                        <v-text-field v-model="item.currency" label="Currency Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="item.period" label="Periodo Id"></v-text-field>
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
    import AccountService from "@/services/account-service";
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
                dniC: ''
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
                AccountService.update(this.dniC, this.item)
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
            }
        },
        created() {
            this.retrieveAccount(this.$route.params.clientId);
        }
    }
</script>

<style scoped>

</style>
