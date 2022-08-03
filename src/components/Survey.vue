<template>
  <div class="container">
      <br><br>
      <v-row >
        <v-col  cols="12" sm="2">
          <v-btn class="btn-outline-dark"
            @click="searchSurvey">
            Search Survey
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="name"/>
        </v-col> 
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Survey name</span>
        </v-col>
        
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <SurveyView
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @deleteSurvey="goDelete(survey )"
        @updateSurvey="goEdit(survey )"
        @viewSurvey="goView(survey )"
    /><br>
 <v-btn  @click="createSurvey">
    Add a Survey
  </v-btn>&nbsp;
  
  &nbsp;
  <v-btn  @click="back()">
    Back
  </v-btn>
   
  </div>
</template>

<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyView from '@/components/SurveyView.vue';
export default {
  name: "survey",
  data() {
    return {
      surveys: [],
      questions:[],
      answers:[],
      currentSurvey: null,
      currentIndex: -1,
      name: "",
      message : "Search, Edit or Delete Surveys"
    };
  },
  components: {
        SurveyView
    },
  methods: {
    goEdit(survey) {
      this.$router.push({ name: 'edit', params: { id: survey.id } });
    },
    goView(survey) {
      this.$router.push({ name: 'view', params: { id: survey.id } });
    },
    async goDelete(survey) {
      var answerids = [];
      var questions = await SurveyDataService.getAllQuestions(survey.id)
      this.questions = questions.data;
      
      for(var i=0;i<this.questions.length;i++)
      {
        
        var answer = await SurveyDataService.getAnswer(this.questions[i].id);
        this.answers = answer.data;
        for(var j= 0;j<this.answers.length;j++)
        {
          await SurveyDataService.deleteUserResponse(this.answers[j].id);
        }
        await SurveyDataService.deleteAnswers(this.questions[i].id);
      }
      await SurveyDataService.delete(survey.id)
      await SurveyDataService.deleteQuestions(survey.id)
      await SurveyDataService.deleteAssignedSurveys(survey.id);  
      this.retrieveSurveys();   
           
    },
    back()
    {
      this.$router.push({ name: 'admin'});
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.surveys = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    createSurvey(){
        this.$router.push({ name: 'addsurvey' });
    },
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    
    searchSurvey() {
      SurveyDataService.findByName(this.name)
        .then(response => {
          this.surveys = response.data;
          this.setActiveSurvey(null);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveSurveys();
  }
};
</script>
