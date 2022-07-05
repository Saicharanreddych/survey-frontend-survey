<template>
    <h1>Sign up</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Email"
            v-model="user.email"
            required
        />
        <v-text-field
            label="First Name"
            v-model="user.firstname"
        />
        <v-text-field
            label="Last Name"
            v-model="user.lastname"
        />
        <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="addUser()"
                    >Sign up</v-btn
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
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        email: "",
        firstname: "",
        lastname: "",
        password:""
      },
      message: "Enter data and click sign up",
      show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          
    }};
  },
  methods: {
    addUser() {
      var data = {
        email: this.user.email,
        firstname: this.user.firstname,
        lastname:this.user.lastname,
        password:this.user.password
      };
     
      UserDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          localStorage.setItem("username",response.data.fname);
          console.log("add "+response.data);
          this.$router.push({ name: 'welcome' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'home' });
    }
  }
}
</script>
<style>

</style>