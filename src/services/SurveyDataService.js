
import http from "../http-common";
class SurveyDataService{
    create(data)
    {
        return http.post("/surveys/createsurvey",data);
    }
    insertquestions(data,surveyid)
    {
        return http.post(`/surveys/insert/${surveyid}`,data);
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
