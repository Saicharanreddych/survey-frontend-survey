<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Admin Operations</h3>
    </header>
    <v-btn class="btn btn-outline-dark btn-block" @click="redirectSurvey()">Survey operations</v-btn>
    <v-btn class="btn btn-outline-dark btn-block" >User operations</v-btn>
  </div>
</template>

<script>
import UserService from "../services/user.service";

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
        }
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
