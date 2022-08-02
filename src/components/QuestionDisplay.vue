<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ question.question }}</span>
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