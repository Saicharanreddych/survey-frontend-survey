<template>
  <div class="container">
      <br><br>
      <v-row >
        <v-col  cols="12" sm="2">
          <v-btn class="btn-outline-dark"
            @click="searchSurvey">
            Search Users
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="name"/>
        </v-col> 
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">User name</span>
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
      <UserDisplay
        v-for="user in users"
        :key="user.id"
        :user="user"
        @deleteTutorial="goDelete(user)"
        @updateTutorial="goEdit(user)"
        @viewTutorial="goView(user)"
    />
 
  <v-btn  @click="removeAllTutorials">
    Remove All
  </v-btn>
   
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import UserDisplay from '@/components/UserDisplay.vue';
export default {
  name: "userOp",
  data() {
    return {
      users: [],
      currentSurvey: null,
      currentIndex: -1,
      name: "",
      message : "Search, Delete users"
    };
  },
  components: {
        UserDisplay
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
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log("hello");
          console.log(this.users);
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
      UserDataService.findByName(this.title)
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
    this.retrieveUsers();
  }
};
</script>