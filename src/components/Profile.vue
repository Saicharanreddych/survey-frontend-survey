<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    
    
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul>
    <v-btn v-if="user" @click="edit()">Edit username</v-btn>
    <v-btn v-else @click="editadmin()">Edit username</v-btn>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: 'Profile',
  data(){
    return{
      user:false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    edit()
    {
      var userid = JSON.parse(localStorage.getItem("user")).id;
      this.$router.push({name:"edituser",params: { id:userid }});
    },

    editadmin()
    {
      var adminid = JSON.parse(localStorage.getItem("user")).id;
      this.$router.push({name:"editadmin",params: { id:adminid }});
    },
    
    checkAdmin()
    {
      var adminId;
      UserDataService.check()
      .then(response =>{
        
        adminId = response.data[0].userId
        console.log(this.currentUser);
        if(adminId != this.currentUser.id)
          this.user = true;
        })
      .catch(e=>{

      })
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.checkAdmin();
    this.$store.state.auth.user = JSON.parse(localStorage.getItem("user"));
    ;
  }
};
</script>