
<template>
<v-row>
  <v-col  cols="8"
        >
      <v-text-field
            label="Enter the question"   
        />
      <v-select class = "dropdown" :items="types">
        
      </v-select>
  </v-col>
  
  
  <v-col  cols="4">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteField"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      types: ['Text answer', 'Rating question', 'Agree/Disagree question'],
    };
  },
  methods: {

    deleteField() {
      this.$emit("deleteField");
    },
   
  }
};
</script>

<style></style>