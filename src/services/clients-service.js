import http from './http-common'
class ClientsService{
    getById(id){
        return http.get(`/students/${id}`);
    }
    create(data){
        return http.post(`/students`,data);
    }
}
export default new ClientsService();
