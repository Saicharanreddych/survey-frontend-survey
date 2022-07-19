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
          
          </v-card>
        </v-col>
        
      </v-row>
    
  </div>
  
</template>

<script>
import UserService from "../services/user.service";
import homeimage from '../assets/homeimage.jpg';
export default {
  name: "Home",
  data() {
    return {
      content: "",
      homeimage
    };
  },
  
};
</script>
