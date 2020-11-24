import http from './http-common'
class ClientsService{
    getById(id){
        return http.get(`/clients/${id}`);
    }
    create(data){
        return http.post(`/clients`,data);
    }
}
export default new ClientsService();
