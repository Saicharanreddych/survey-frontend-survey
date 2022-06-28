import http from "../http-common";
class UserDataService{
    create(data)
    {
        return http.post("/user",data);
    }
    get(id) {
        return http.get(`/user/${id}`);
      }
}
export default new UserDataService();

