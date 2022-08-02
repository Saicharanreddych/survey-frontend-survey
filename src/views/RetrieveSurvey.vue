<template>

    <h3> Survey Name : {{survey.surveyname}}</h3><br>
    <Form @submit="saveResponse">
        
          <div class="form-group" v-for="(question,index) in questions">
            <label :for="question.id">{{question.question}}</label>
            <v-text-field v-if="question.type=='Text answer'" :name="question.id" type="text" :id="question.id"></v-text-field>
            <div v-if="question.type=='Agree/Disagree question'">
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Strongly Agree"/>Strongly Agree &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Agree"/>Agree &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Neutral"/>Neutral &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Disagree"/>Disagree &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Strongly Disagree"/>Strongly Disagree &nbsp;

            </div>

            <div v-if="question.type=='Rating question'">
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Very satisfied"/>Very satisfied &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Satisfied"/>Satisfied &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Neutral"/>Neutral &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Unsatisfied"/>Unsatisfied &nbsp;
                <input :name="question.id" type="Radio" @change="onChange($event)" value="Very Unsatisfied"/>Very Unsatisfied &nbsp;

            </div>
                    
          </div>
          
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Submit
            </button>
          </div>

          <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
        
      </Form>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";


export default {
  name: "view-survey",
  props: ['id'],
    components: {
    Form,
    
    },
  data() {
    
    return {
      survey: {},
      answerresponse:{},
      questions : [],
      multiple:{},
      successful:false,
      message: false,
      
    };
  },
  methods: {
    onChange(event) {
              this.multiple[event.target.name] = event.target.value;
              
          },
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

    saveResponse() {
      var status;
      var answers = [];
      var questionids = [];
      var userid = this.$route.params.userid;
       for(var i = 0; i<this.questions.length;i++)
      {
        var question = this.questions[i];
        if(question.type == 'Rating question')
        {
          status = this.multiple[question.id] ? "yes" : "no";
          if(status == "no")
          {
            this.message = "Survey response is required : "+ question.question 
            this.successful = false
            return;
          }
          else
          {
            answers.push(this.multiple[question.id]);
            questionids.push(question.id);
          }
        }
        else if(question.type =='Agree/Disagree question')
        {
          status = this.multiple[question.id] ? "yes" : "no";
          if(status == "no")
          {
            this.message = "Survey response is required : "+ question.question 
            this.successful = false
            return;
          }
          else
          {
            answers.push(this.multiple[question.id]);
            questionids.push(question.id);
          }
        }
        else
        {
          var answer = document.getElementById(question.id).value;
          if(answer.length == 0)
        {
            this.message = "Survey response is required : "+ question.question 
            this.successful = false
            return;
        }
        else
        {
            answers.push(answer);
            questionids.push(question.id);
        }
        }
      }
      
      var data =
      {
        answers : JSON.stringify(answers),
        questionids: JSON.stringify(questionids)
      }
      SurveyDataService.insertanswers(data)
      .then(response =>{
        this.answerresponse = response.data
        var data ={
            answerresponse:this.answerresponse,
            userid : userid
        }
        SurveyDataService.insertresponse(data)
        .then(response =>{
            
            this.$router.push({name:"user",params:{userid:userid}});
        })
        
      })
      .catch(e =>{
        this.message = e.response.data.message;
      }
      );
      
     
      
    },
     
    
    cancel(){
        this.$router.push({ name: 'tutorials' });
    }
  },
    mounted() {
    if(this.$route.params.userid == undefined)
    {
      this.$router.push({name:'user'});
    }
    this.retrieveSurveyQuestions();
    
  }
}
</script>