import http from './http-common'

class AccountService{
    create(clientId,data){
        return http.post(`/clients/${clientId}/accounts`,data);
    }
    getByClientId(clientId){
        return http.get(`/clients/${clientId}/accounts`)
    }
}
export default new AccountService();
