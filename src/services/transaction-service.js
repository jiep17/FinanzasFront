import http from './http-common';

class TransactionService {
    getAll(accountId) {
        return http.get(`/accounts/${accountId}/transactions`);
    }
    get(accountId,id) {
        return http.get(`/accounts/${accountId}/transactions/${id}`);
    }
    create(accountId,data) {
        return http.post(`/accounts/${accountId}/transactions`, data);
    }
    update(accountId,id, data) {
        return http.put(`/accounts/${accountId}/transactions/${id}`, data);
    }
}
export default new TransactionService();
