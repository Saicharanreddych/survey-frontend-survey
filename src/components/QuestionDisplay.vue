<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ question.question }}</span>
  </v-col>
  
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateQuestion"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteQuestion"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteQuestion() {
      this.$emit("deleteQuestion");
    },
    updateQuestion() {
      this.$emit("updateQuestion");
    }
  }
};
</script>

<style></style>