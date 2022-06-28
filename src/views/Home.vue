<template>
<div justify="center">
    
      <v-row style="height: 400px" justify="center">
        <v-col col="1" align-self="center"> 
           
            <v-img :src=homeimage></v-img>
            
        </v-col>
        <v-col align-self="center">
          <v-card
            class="mx-auto"
            max-width="344"
          >
          <v-card-title>
            WELCOME TO
          </v-card-title>
           <v-card-subtitle>
            SMART SURVEY
           </v-card-subtitle>
           <v-card-actions>
            
            <v-btn color="info" @click="Signup">
                SIGN UP
            </v-btn>
            <v-btn color="info" @click="Login">LOGIN</v-btn>
           </v-card-actions>
          </v-card>
        </v-col>
        
      </v-row>
    
  </div>
        
</template>
<script>
import homeimage from '../assets/homeimage.jpg';
import TutorialDataService from "../services/TutorialDataService";
import TutorialDisplay from '@/components/TutorialDisplay.vue';
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Tutorials",
      homeimage
    };
  },
  components: {
        TutorialDisplay
    },
  methods: {
    Signup(){
        this.$router.push({ name: 'signup' });
    },
    Login(){
        this.$router.push({name:'login'});
    },
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
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
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
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>
<style>

</style>