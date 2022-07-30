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
}
export default new UserDataService();