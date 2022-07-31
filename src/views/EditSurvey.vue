<template>
    <h1>Edit survey</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Survey name"
            v-model="survey.surveyname"
        />
        
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateSurvey()"
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
import SurveyDataService from "../services/SurveyDataService";
export default {
  name: "edit-survey",
  props: ['id'],
  data() {
    return {
      survey: {},
      message: "Enter data and click save"
      
    };
  },
  methods: {
    retrieveSurvey() {
      var surveyid = this.$route.params.id;
      SurveyDataService.get(surveyid)
        .then(response => {
          this.survey= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateSurvey() {
      var data = {
        surveyname: this.survey.surveyname
      };
      SurveyDataService.update(this.survey.id,data)
        .then(response => {
          this.survey.id = response.data.id;
          this.$router.push({ name: 'survey' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'survey' });
    }
  },
    mounted() {
    this.retrieveSurvey();
  }
}

</script>
<style>

</style>