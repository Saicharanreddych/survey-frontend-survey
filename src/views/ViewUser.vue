<template>
  <div class="container">
    


   
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
    

    back(){
     this.$router.push({ name: 'userOp' });
    },

    
    
    retrieveSurveys() {
      SurveyDataService.getAssigned()
        .then(response => {
          this.surveys = response.data;
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