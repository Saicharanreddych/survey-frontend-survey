
<template>
    <h1>Create a new survey</h1>
    <h4>{{ message }}</h4>
    <v-form>
      <v-text-field label="Enter survey name" v-model="survey.surveyname"/>
      Enter number of questions:- <input type="number"
            placeholder="No of questions"
            style = "border:solid;"
            v-model="number"
        /><br><br>
        <v-btn @click="generate()">Generate</v-btn><br><br>
        <SurveyDisplay v-if="clicked"
          v-for="index in number"
                :key="index"
                v-bind:id ="index"
        @deleteField="goDelete(index)"
        
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveSurvey()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyDisplay from '@/components/SurveyDisplay.vue';

export default {
  name: "addsurvey",
  components:{
    SurveyDisplay
  },
  data() {
    return {
      survey: {
        id: null,
        surveyname: ""
      },
      message: "Enter data and click save",
      number:parseInt(0),
      trackingquestions:[],
      
      clicked:false
    };
  },
  methods: {
    generate()
    {
        this.clicked = true;
        for(var i = 1;i<=this.number;i++){
            this.trackingquestions[i] = i;
        }
    },
    goDelete(index)
    {
      document.getElementById(index).remove();
      this.trackingquestions.splice(this.trackingquestions.indexOf(index),1);
    },
    saveSurvey() {
      var data = {
        surveyname:this.survey.surveyname
      }
      var question = [];
      SurveyDataService.create(data)
      .then(response => {
        this.survey.id = response.data.id;
      for(var i = 1 ; i<=this.trackingquestions.length - 1;i++)
      {
        question.push(document.getElementById(this.trackingquestions[i]).getElementsByTagName("input")[0].value);
      }
      
      var data ={
        questions : JSON.stringify(question)
      }
      SurveyDataService.insertquestions(data,this.survey.id)
      .then(response =>{
        this.$router.push({name:"survey"});
      })
      .catch(e =>{
        this.message = e.response.data.message;
      }
      );
      })
      .catch(e => {
        this.message = e.response.data.message;
      });
    },
    cancel(){
        this.$router.push({ name: 'survey' });
    }
  }
}

</script>
<style>

</style>
