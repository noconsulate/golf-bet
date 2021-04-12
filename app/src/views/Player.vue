<template>
  <div class="h-screen w-screen flex flex-col">
    <p>Current user</p>
    <p> {{user}}
    <p>Sign Up</p>
    <p>Email</p>
    <input class="border w-full" v-model="email" />
    <p>Password</p>
    <input class="border w-full" v-model="password" />
    <button @click="signUpEmail">Submit</button>
  </div>
</template>

<script>
import {signUpWithEmail} from "../utilities/bridges/auth";
export default {
  name: "player",
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    async signUpEmail() {
      // let userId, session
      let result
      try {
      result = await signUpWithEmail( this.email, this.password)
      } catch (e) {
        console.error(e);
      }
      
      console.log(result)
    }
  }
}
</script>