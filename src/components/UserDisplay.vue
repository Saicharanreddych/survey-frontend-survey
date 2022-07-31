<template>
<v-row>
  <v-col  cols="9"
        sm="2">
      <span >{{ user.username }}</span>
  </v-col>
  
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateUser"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewUser"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteUser"/>
  </v-col>

  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-check" @click="assignSurvey"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteUser() {
      this.$emit("deleteUser");
    },
    updateUser() {
      this.$emit("updateUser");
    },
    viewUser() {
      this.$emit("viewUser");
    },
    assignSurvey() {
      this.$emit("assignSurvey");
    },
  }
};
</script>

<style></style>