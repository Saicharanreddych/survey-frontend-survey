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
              v-model="title"/>
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
      <TutorialDisplay
        v-for="tutorial in tutorials"
        :key="tutorial.id"
        :tutorial="tutorial"
        @deleteTutorial="goDelete(tutorial)"
        @updateTutorial="goEdit(tutorial)"
        @viewTutorial="goView(tutorial)"
    />
 <v-btn  @click="createSurvey">
    Add a Survey
  </v-btn>&nbsp;
  <v-btn  @click="removeAllTutorials">
    Remove All
  </v-btn>
   
  </div>
</template>

<script>
import SurveyDataService from "../services/SurveyDataService";
import TutorialDisplay from '@/components/TutorialDisplay.vue';
export default {
  name: "survey",
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Surveys"
    };
  },
  components: {
        TutorialDisplay
    },
  methods: {
    goEdit(tutorial) {
      this.$router.push({ name: 'edit', params: { id: tutorial.id } });
    },
    goView(tutorial) {
      this.$router.push({ name: 'view', params: { id: tutorial.id } });
    },
    goDelete(tutorial) {
      TutorialDataService.delete(tutorial.id)
        .then( () => {
    
          this.retrieveTutorials()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
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
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentSurvey = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchTitle() {
      SurveyDataService.findByTitle(this.title)
        .then(response => {
          this.surveys = response.data;
          this.setActiveTutorial(null);
          
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


