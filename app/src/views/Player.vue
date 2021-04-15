<template>
  <div class="h-screen w-1/2 flex flex-col">
    <p>Current user</p>
    <p> {{handle}}</p>
    <p> {{email}}</p>
    <p>Balance</p>
    <p>{{balance}}</p>
    <button class="btn" @click="signOut">Sign out</button>
    <p>Sign Up</p>
    <p>Handle</p>
    <input class="border w-full" v-model="handle" />
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
import {signUpWithEmail, insertUserDetails, signOut, signIn} from "../utilities/bridges/auth";
export default {
  name: "player",
  data() {
    return {
      handle: 'abraham',
      email: 'aali@bech.net',
      password: 'shitfaced',
    }
  },
  computed: {
    email() {
      if (this.$store.state.user) {
        return this.$store.state.user.email
      } else {
        return "no user"
      }
    },
    handle() {
      return this.$store.state.userDetails.handle;
    },
    balance() {
      return this.$store.state.userDetails.balance;
    }
  },
  methods: {
    async signUpEmail() {
      const {user, session, error} = await signUpWithEmail( this.email, this.password)
      
      // todo: handle signup error
      if (error) console.log("signup login problem", error);
      if (user) this.$store.dispatch("setUser", user);

      console.log(user, session, error)
      
      const BALANCE = 6000000

      const { data, error2} = await insertUserDetails({
        user_id: user.id, handle: this.handle, balance: BALANCE
      })

      console.log(data, error2)

      if (error2) console.error("user details insert problem", error2)

      if (data) {
        const userDetails = {
          email: user.email,
          uuid: user.id,
          handle: data.handle,
          userDetailsId: data.id,
          balance: data.balance
        }
        this.$store.dispatch("setUserDetails", userDetails);
      }

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