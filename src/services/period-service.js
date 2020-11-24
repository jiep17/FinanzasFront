import http from './http-common';

class PeriodService {
    getAll() {
        return http.get('/periods');
    }

}
export default new PeriodService();
