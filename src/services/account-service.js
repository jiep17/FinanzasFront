import http from './http-common';

class AccountService {
    get(id) {
        return http.get(`/clients/${id}/accounts`);
    }
    create(clientId,data) {
        return http.post(`/clients/${clientId}/accounts`, data);
    }
    update(clientId, data){
        return http.put(`/clients/${clientId}/accounts`, data);
    }
}
export default new AccountService();
