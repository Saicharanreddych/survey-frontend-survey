import http from "../http-common";
class UserDataService{
    create(data)
    {
        return http.post("/user",data);
    }
}
export default new UserDataService();

