import http from './http-common';

class FeeTypeService {
    getAll() {
        return http.get('/feetypes');
    }

}
export default new FeeTypeService();
