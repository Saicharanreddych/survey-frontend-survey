<template>
  <div class="container">
      <br><br>
      <v-row >
        <v-col  cols="12" sm="2">
          <v-btn class="btn-outline-dark"
            @click="searchUser">
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
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>&nbsp;
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Assign Survey</span>
        </v-col>
      </v-row>
      <UserDisplay
        v-for="user in users"
        :key="user.id"
        :user="user"
        @deleteUser="goDelete(user)"
        @viewUser="goView(user)"
        @assignSurvey = "goAssign(user)"
    />
  <br><br>
  
  
   <v-btn  @click="addUser">
    Add an user
  </v-btn>&nbsp;
   <v-btn  @click="back">
    Back
  </v-btn>

  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import SurveyDataService from "../services/SurveyDataService";
import UserDisplay from '@/components/UserDisplay.vue';
export default {
  name: "userOp",
  data() {
    return {
      users: [],
      answerresponse:[],
      currentUser: null,
      currentIndex: -1,
      name: "",
      message : "Search, Delete users"
    };
  },
  components: {
        UserDisplay
    },
  methods: {
    
    goView(user) {
      this.$router.push({ name: 'viewuser', params: { id: user.id } });
    },
    async goDelete(user) {
      
      var response = await SurveyDataService.getUserResponses(user.id);
      
      for(var i=0;i<response.data.length;i++)
      {
        
        await SurveyDataService.deleteAnswer(response.data[i].answerId);
      }
      await SurveyDataService.deleteAssignedSurveys(user.id);
      await UserDataService.delete(user.id);
      this.retrieveUsers();
    },
    goAssign(user){
      this.$router.push({name:'assignsurvey',params:{id:user.id}});
    },
    addUser() {
      this.$router.push({name:'addUser'});

    },
    back() {
      this.$router.push({name:'admin'});

    },
    retrieveUsers() {
      var adminId;
      UserDataService.check()
      .then(response =>{
        
        adminId = response.data[0].userId;
  
      UserDataService.getAll()
        .then(response => {
          
          for(var i=0;i<response.data.length;i++)
          {
               if(response.data[i].id == adminId)
                  response.data.splice(i,1);
          }
          this.users = response.data;
        })})
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
   
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
    },
    
    
    searchUser() {

      var adminId;
      UserDataService.check()
      .then(response =>{
        
        adminId = response.data[0].userId;
  
      UserDataService.findByName(this.name)
        .then(response => {
          
          for(var i=0;i<response.data.length;i++)
          {
               if(response.data[i].id == adminId)
                  response.data.splice(i,1);
          }
          this.users = response.data;
          this.setActiveUser(null);
        })})
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