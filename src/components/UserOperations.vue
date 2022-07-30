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
        @deleteUser="goDelete(user)"
        @updateUser="goEdit(user)"
        @viewUser="goView(user)"
    />
  <br><br>
  <v-btn  @click="removeAllUsers">
    Remove All Users
  </v-btn>
  &nbsp;
   <v-btn  @click="addUser">
    Add an user
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
    addUser() {
      this.$router.push({name:'addUser'});

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