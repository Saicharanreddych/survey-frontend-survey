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
    get(id) {
        return http.get(`/surveys/${id}`);
      }
    getAllQuestions(id) {
        return http.get(`/surveys/questions/${id}`);
      }
    getAll()
    {
        return http.get("/surveys/getsurveys");
    }
   
      delete(id) {
        return http.delete(`/surveys/${id}`);
      }

      deleteQuestions(id) {
        return http.delete(`/surveys/questions/${id}`);
      }

    findByName(name) {
        return http.get(`/surveys/getsurveys?name=${name}`);
      }
}
export default new SurveyDataService();
