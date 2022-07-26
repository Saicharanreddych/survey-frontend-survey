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
    findByName(name) {
        return http.get(`/surveys/getsurveys?name=${name}`);
      }
}
export default new SurveyDataService();
