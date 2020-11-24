import http from './http-common'

class FeeService{

    create(accountId,data){
        return http.post(`/accounts/${accountId}/fees`,data);
    }

}
export default new FeeService();
