import http from './http-common';

class TransactionService {
    getAll() {
        return http.get('/properties');
    }
    get(id) {
        return http.get(`/properties/${id}`);
    }
    create(data) {
        return http.post("/properties", data);
    }
    update(id, data) {
        return http.put(`/properties/${id}`, data);
    }
}
export default new TransactionService();
