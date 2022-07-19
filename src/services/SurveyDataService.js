import http from "../http-common";
class SurveyDataService{
    create(data)
    {
        return http.post("/surveys/createsurvey",data);
    }
    getAll()
    {
        return http.get("/surveys/getsurveys");
    }
}
export default new SurveyDataService();
