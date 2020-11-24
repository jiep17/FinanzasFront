import http from './http-common'

class ClientsService{
    getAll(){
        return http.get(`/clients`);
    }
    getById(id){
        return http.get(`/clients/${id}`);
    }
    create(data){
        return http.post(`/clients`,data);
    }
}
export default new ClientsService();
