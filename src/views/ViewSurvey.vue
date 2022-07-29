<template>
    <h2>Survey View</h2>
    <h4>{{ message }}</h4><br>
    <h3> Survey Name : {{survey.surveyname}}</h3>
    
     

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Question</span>
        </v-col>
       
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <QuestionDisplay
        v-for="question in questions"
        :key="question.id"
        :question="question"
        @deleteQuestion="goDeleteQuestion(question)"
        @updateQuestion="goEditQuestion(question)"
    />

   
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";

import QuestionDisplay from '@/components/QuestionDisplay.vue';
export default {
  name: "view-survey",
  props: ['id'],
    components: {
        QuestionDisplay
    },
  data() {
    return {
      survey: {},
      questions : [],
      message: "Edit or Delete questions"
    };
  },
  methods: {
    retrieveSurveyQuestions() {
      var surveyid = this.$route.params.id;
      SurveyDataService.get(surveyid)
        .then(response => {
          this.survey= response.data;
          SurveyDataService.getAllQuestions(surveyid)
            .then(response=> {
              this.questions = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     
    goEditQuestion(question) {
      this.$router.push({ name: 'editQuestion', params: { Id: question.id} });
    },
    
    goDeleteQuestion(question) {
      SurveyDataService.deleteQuestion(question.id)
        .then( () => {
          this.retrieveSurveyQuestions()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'tutorials' });
    }
  },
    mounted() {
    this.retrieveSurveyQuestions();
  }
}
</script>