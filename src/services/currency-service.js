import http from './http-common';

class CurrencyService {
    getAll() {
        return http.get('/currencies');
    }

}
export default new CurrencyService();
