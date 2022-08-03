<template>
    <h2>Survey View</h2>
    
    <h3> Survey Name : {{survey.surveyname}}</h3>
    
     

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Question</span>
        </v-col>
  
      </v-row>
      <QuestionDisplay
        v-for="question in questions"
        :key="question.id"
        :question="question"
    /><br>
    <v-btn @click="back()">Back</v-btn>

   
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
      
    };
  },
  methods: {
    retrieveSurveyQuestions() {
      var surveyid = this.$route.params.id;
      SurveyDataService.getSurvey(surveyid)
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
  
    back(){
        this.$router.push({ name: 'survey' });
    },
  },
    mounted() {
    if(this.$route.params.id==undefined)
    {
      this.$router.push({name:'survey'});
    }
    this.retrieveSurveyQuestions();
  }
}
</script>