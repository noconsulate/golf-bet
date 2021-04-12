<template>
  <div class="h-screen w-1/2 flex flex-col">
    <p>Current user</p>
    <p> {{user}}</p>
    <button class="btn" @click="signOut">Sign out</button>
    <p>Sign Up</p>
    <p>Email</p>
    <input class="border w-full" v-model="email" />
    <p>Password</p>
    <input class="border w-full" v-model="password" />
    <button class="btn" @click="signUpEmail">Submit</button>
    <p>Sign in</p>
    <p>Email</p>
    <input class="border w-full" v-model="email" />
    <p>Password</p>
    <input class="border w-full" v-model="password" type="password" />
    <button class="btn" @click="signIn">Sign in</button>
  </div>
</template>

<script>
import {signUpWithEmail, signOut, signIn} from "../utilities/bridges/auth";
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
      if (this.$store.state.user) {
        return this.$store.state.user.email
      } else {
        return "no user"
      }
    }
  },
  methods: {
    async signUpEmail() {
      const {user, session, error} = await signUpWithEmail( this.email, this.password)
      
      if (error) console.log(error);
      if (user) this.$store.dispatch("setUser", user);
    },
    async signOut() {
      const {error} = await signOut();
      console.log(error)  
      if (!error) {
        console.log('no error returned from signOut()')
        this.$store.dispatch("setUser", null)
      }
    },
    async signIn() {
      const {user, session, error} = await signIn(this.email, this.password)

      if (error) console.log(error);
      if (user) this.$store.dispatch("setUser", user);
    }
  }
}
</script>