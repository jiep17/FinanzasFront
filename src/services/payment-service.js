import http from './http-common';

class PaymentService {

    pay(clientId,data) {
        return http.post(`/clients/${clientId}/payment`, data);
    }
}
export default new PaymentService();
