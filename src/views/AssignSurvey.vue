<template>
  <div class="container">
    <input type='checkbox' @click='checkAll()' v-model='isCheckAll'> Check All
    <table>
        <thead>
            <tr>
                <td><strong>Select</strong></td>
                <td><strong>Survey Name</strong></td>
                <td><strong>Survey Status</strong></td>
            </tr>
        </thead>
        
        <tr v-for="survey in surveys">
        <td><input v-if="!survey.status" type="checkbox" :id="survey.id" :value ="survey.id" v-model = selected @change = 'updateCheckall()'></td>
        
        <td>{{survey.surveyname}}</td>
        <td v-if="survey.status">Already Assigned</td>
         <td v-else="survey.status">Not Assigned</td>
        </tr>
    </table>
    <br>

    
    <v-btn @click = "assignSurveys()">Assign Selected</v-btn>&nbsp;
    <v-btn @click = "back()">Back</v-btn>
  


   
  </div>
</template>

<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyView from '@/components/SurveyView.vue';

export default {
  name: "survey",
  data() {
    return {
      surveys: {
        status:false,
      },
      assigned:[],
      currentSurvey: null,
      currentIndex: -1,
      name: "",
      message : "Search, Edit or Delete Surveys",
      selected:[],
      isCheckAll: false
    };
  },
  components: {
    SurveyView,

},
  methods: {
    checkAll: function(){

      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if(this.isCheckAll){ // Check all
       
        for (var key in this.surveys) {

          if(!this.surveys[key].status){
                this.selected.push(this.surveys[key].id);
          }
          
         
        }
      }
      
    },
    updateCheckall: function(){
      if(this.selected.length == this.surveys.length){
         this.isCheckAll = true;
      }else{
         this.isCheckAll = false;
      }
    },

    back(){
     this.$router.push({ name: 'userOp' });
    },

    assignSurveys(){
        var userid = this.$route.params.id;
        var data ={
            userid : this.$route.params.id,
            surveyid:null
        }
        
        
       
        for(var key in this.selected){
            data.surveyid = this.selected[key];
            
        SurveyDataService.assignSurvey(data)
        .then(response => {
            console.log("Survey Assigned"+response.data);
            this.$router.push({name:'userOp'});

        })
        .catch( e => {
            this.message = e.response.data.message;
        })
        }
    },
    
    retrieveSurveys() {
      var userid = this.$route.params.id;
      SurveyDataService.getAssigned(userid)
      .then(response =>{
            this.assigned = response.data;
        
        

        SurveyDataService.getAll()
        .then(response => {

            this.surveys = response.data;
            
            for(var j = 0 ; j<this.assigned.length;j++){
                for(var i=0;i<response.data.length;i++)
                {
                    
               if(response.data[i].id == this.assigned[j].surveyId)
                  this.surveys[i].status = true
                }
            }
          
        })

      })
      
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    
    
  },
  mounted() {
    this.retrieveSurveys();
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