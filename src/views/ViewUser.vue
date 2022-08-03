<template>
    <table>
      <thead>
        <th>Survey name</th>
        <th>Status</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="survey in surveys">
        <td>{{survey.surveyname}}</td>
        <td v-if="survey.status">User responded</td>
        <td v-if="survey.status"><v-btn @click="userResponse(survey)">View Response</v-btn></td>
        <td v-if="!survey.status">User did not <br>responded yet</td>
        <td v-if="!survey.status">No action can be performed</td>
        </tr>
      </tbody>
    </table>
    <p>{{message}}</p><br>
    <v-btn @click="back()">
      Back
    </v-btn>
   
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
      surveys: [],
      questions : [],
      userid : null,
      message: null
    };
  },
  methods: {
    async retrieveAssignedSurveys() {
      this.userid = this.$route.params.id;
      var surveyids = await SurveyDataService.getAssigned(this.userid);

      if(surveyids.data.length==0)
      {
          this.message = "No surveys assigned";
      }
      
      for(var i = 0; i<surveyids.data.length;i++)
      {
        var survey = await SurveyDataService.getSurvey(surveyids.data[i].surveyId);
        var questions = await SurveyDataService.getAllQuestions(surveyids.data[i].surveyId);
        console.log(questions.data);

        var answer = await SurveyDataService.getAnswers(questions.data[0].id,this.userid);
        this.surveys.push(survey.data);
        if(answer.data.length)
        {
           this.surveys[i].status = true
        }
        else
        {
           this.surveys[i].status = false
        }
      }
    },

    userResponse(survey)
    {
      this.$router.push({name:'viewresponse',params:{id:survey.id, userid:this.userid}});
    },
     
    
    back(){
        this.$router.push({ name: 'userOp' });
    }
  },
    async mounted() {
    await this.retrieveAssignedSurveys();
  }
}
</script>