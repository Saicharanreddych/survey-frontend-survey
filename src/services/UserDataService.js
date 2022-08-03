import http from "../http-common";
class UserDataService{
    create(data)
    {
        return http.post("/surveys/user",data);
    }
    getAll()
    {
        return http.get("surveys/users/all");
    }
    check()
    {
        return http.get("surveys/checkadmin");
    }
    findByName(name) {
        return http.get(`/surveys/users/all?name=${name}`);
      }
    getUser(id){
        return http.get(`surveys/user/${id}`);
    }
    update(id,data){
        return http.put(`surveys/user/${id}`,data);
    }
    delete(id){
        return http.delete(`surveys/user/${id}`);
    }
}
export default new UserDataService();