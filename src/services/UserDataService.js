import http from "../http-common";
class UserDataService{
    create(data)
    {
        return http.post("/surveys/user",data);
    }
}
export default new UserDataService();

