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
    insertanswers(data)
    {
        return http.post(`/surveys/insertanswers`,data);
    }
    insertresponse(data)
    {
        return http.post(`/surveys/insertresponse`,data);
    }
    getSurvey(id) {
        return http.get(`/surveys/${id}`);
      }
    getAllQuestions(id) {
        return http.get(`/surveys/questions/${id}`);
      }
    getAll()
    {
        return http.get("/surveys/getsurveys");
    }
    update(id, data) {
        return http.put(`/surveys/${id}`, data);
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
      assignSurvey(data) {
        return http.post(`/surveys/assign`,data);
      }
      getAssigned(userid) {
        return http.get(`/surveys/assign/${userid}`);
      }
      getAnswers(questionid,userid) {
        return http.get(`/surveys/answer/${questionid}/${userid}`);
      }
}
export default new SurveyDataService();