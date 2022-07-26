
<template>
<v-row>
  <v-col  cols="8"
        >
      <v-text-field
            label="Enter the question"   
        />
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