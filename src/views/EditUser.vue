<template>
    <h1>Edit username</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="User name"
            v-model="user.username"
        />
        
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateUser()"
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
import UserDataService from "../services/UserDataService";
export default {
  name: "edit-survey",
  props: ['id'],
  data() {
    return {
      user: {
      },
      message: "Enter data and click save"
      
    };
  },
  methods: {
    retrieveUser() {
      var userid = this.$route.params.id;
      UserDataService.getUser(userid)
        .then(response => {
          this.user= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateUser() {
      var data = {
        username: this.user.username
      };
      
      UserDataService.update(this.user.id,data)
        .then(response => {
          UserDataService.getUser(this.user.id)
          .then(response =>{
          
          this.user = response.data;
          this.user.roles = ["ROLE_USER"];
          
          localStorage.setItem("user",JSON.stringify(this.user));
          this.$router.push({ name: 'profile' });
          })
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'profile' });
    }
  },
    mounted() {
    this.retrieveUser();
    if(this.$route.params.id == undefined)
    {
        this.$router.push({name:'home'});
    }
  }
}

</script>
<style>

</style>