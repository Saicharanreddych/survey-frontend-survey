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
}
export default new UserDataService();