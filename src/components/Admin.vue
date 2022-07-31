<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Admin Operations</h3>
    </header>
    <v-btn class="btn btn-outline-dark btn-block" @click="redirectSurvey()">Survey operations</v-btn>
    <v-btn class="btn btn-outline-dark btn-block" @click="redirectUser()">User operations</v-btn>
  </div>
</template>

<script>


export default {
  name: "Admin",
  data() {
    return {
      content: "",
    };
  },
  methods: {
        redirectSurvey(){
            this.$router.push("/survey");
        },
         redirectUser(){
            this.$router.push("/userOp");
        }
  },
  
};
</script>