<template>
  <div class="container">
    <br>
    <h4>{{message}}</h4>
    <table v-if="tablestatus">
        <thead>
            <tr>
                <th>Survey name</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "survey in surveys">
                <td>{{survey.surveyname}}</td>
                <td v-if="!survey.status">
                  <v-btn @click="submitSurvey(survey.id)">Take this survey</v-btn>
                </td>
                <td v-if="survey.status">
                  Already submitted.
                </td>
            </tr>
        </tbody>
    </table><br>
    <v-btn @click="back()">Back</v-btn>

   
  </div>
</template>

<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyView from '@/components/SurveyView.vue';
import { tSBigIntKeyword } from "@babel/types";
import { createIfStatement } from "@vue/compiler-core";

export default {
  name: "survey",
  props: ['userid'],
  data() {
    return {
      surveys: {
        
      },
      
      answers:[],
      questions :[],
      message : "Survey List",
      tablestatus: true,
      selected:[],
      isCheckAll: false
    };
  },
  components: {
    SurveyView,
    
},
  methods: {
    back(){
     this.$router.push({ name: 'profile' });
    },
    
    submitSurvey(surveyid)
    {
      this.$router.push({name:'retrievesurvey',params:{id:surveyid,userid:this.$route.params.userid}});
    },
    
    async retrieveSurveys() {
        var userid = this.$route.params.userid;
        var response = await SurveyDataService.getAssigned(userid);
        if(response.data.length==0)
        {
          this.message = "No surveys assigned";
          this.tablestatus = false;
          return;
        }
        for(var i = 0; i< response.data.length;i++)
        {
           var survey = await SurveyDataService.getSurvey(response.data[i].surveyId);
           if(survey.data.length == 0)
           {
              this.message = "No surveys assigned";
           }
           else
           {
              
              this.surveys[i] = survey.data;
              this.questions = await SurveyDataService.getAllQuestions(this.surveys[i].id); 
              
              this.answers = await SurveyDataService.getAnswers(this.questions.data[0].id,userid);
              
              if(this.answers.data.message)
              {
                this.surveys[i].status  = false;
              }
              else
              {
               
                this.surveys[i].status = true;
                
              }
                
           }
        }
          
        },
  },
  async mounted() {
    if(this.$route.params.userid == undefined)
    {
      
      this.$router.push({name:'home'});
    }
    else
    {
    await this.retrieveSurveys();
    }
    
  }
};
</script>

<style>
th,td {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}
</style>