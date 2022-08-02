<template>
    
    <table>
      <thead>
        <th>Question</th>
        <th>Response</th>
        
      </thead>
      <tbody>
        <tr v-for="(question,index) in questions">
        <td>{{question.question}}</td>
        <td>{{answers[index][0].answer}}</td>
        </tr>
      </tbody>
    </table>
    <v-btn @click="back()">Back</v-btn>
   
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";


export default {
  name: "view-response",
  props: ['id'],
    
  data() {
    return {
      surveys: [],
      questions : [],
      answers:[],
    };
  },
  methods: {
    async retrieveQuestions() {
    console.log(this.$route.params);
     var userid = this.$route.params.userid;
      var surveyid = this.$route.params.id;
      var questions = await SurveyDataService.getAllQuestions(surveyid);
      this.questions = questions.data;
      
      for(var i = 0 ;i<this.questions.length;i++){
        var answer = await SurveyDataService.getAnswers(this.questions[i].id,userid);
        
        this.answers.push(answer.data);
      }
    },

    back(){
        this.$router.push({ name: 'userOp' });
    }
  },
    async mounted() {
    if(this.$route.params.userid == undefined)
    {
        this.$router.push({name:"user"});
    }
    await this.retrieveQuestions();
  }
}
</script>