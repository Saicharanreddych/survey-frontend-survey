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
}
export default new UserDataService();