<template>
  <div class="h-screen flex flex-col p-8">
    <div v-if="user.id">
      <p>{{ handle }}</p>
      <p>{{ email }}</p>
      <p>Balance</p>
      <p>{{ balance }}</p>
      <button class="btn block" @click="signOut">Sign out</button>
      <button class="btn" @click="resetUser">Reset user</button>
    </div>
    <MatchInfo />
    <button v-if="!signinOpen && !user.id" @click="toggleSignin" class="btn">
      Sign in
    </button>
    <div v-if="signinOpen">
      <p>Sign in</p>
      <p>Email</p>
      <input class="border w-full" v-model="emailInput" />
      <p>Password</p>
      <input class="border w-full" v-model="passwordInput" type="password" />
      <button class="btn" @click="signIn">Sign in</button>
      <button class="btn" @click="toggleSignin">Cancel</button>
    </div>
    <button v-if="!signupOpen && !user.id" @click="toggleSignup" class="btn">
      Sign Up
    </button>
    <div v-if="signupOpen">
      <p>Sign Up</p>
      <p>Handle</p>
      <input class="border w-full" v-model="handleInput" />
      <p>Email</p>
      <input class="border w-full" v-model="emailInput" />
      <p>Password</p>
      <input class="border w-full" v-model="passwordInput" />
      <button class="btn" @click="signUpEmail">Submit</button>
      <button @click="toggleSignup" class="btn">Cancel</button>
    </div>
  </div>
</template>

<script>
import App from "../App.vue";
import MatchInfo from "../components/Player/MatchInfo";
import {
  signUpWithEmail,
  insertUserDetails,
  signOut,
  signIn,
  getUserDetails,
} from "../utilities/bridges/auth";
export default {
  components: { App, MatchInfo },
  name: "player",
  data() {
    return {
      // ui
      signupOpen: false,
      signinOpen: false,
      // inputs
      handleInput: "",
      emailInput: "alice@trustless.io",
      passwordInput: "password",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    email() {
      return this.$store.state.user.user.email;
    },
    handle() {
      return this.$store.state.user.userDetails.handle;
    },
    balance() {
      return this.$store.state.user.userDetails.balance;
    },
  },
  methods: {
    toggleSignup() {
      this.signupOpen = !this.signupOpen;
    },
    toggleSignin() {
      this.signinOpen = !this.signinOpen;
    },
    async signUpEmail() {
      const { user, session, error } = await signUpWithEmail(
        this.emailInput,
        this.passwordInput
      );

      // todo: handle signup error
      if (error) console.log("signup login problem", error);
      if (user) this.$store.dispatch("setUser", user);

      console.log(user, session, error);

      const BALANCE = 6000000;

      const { data, error2 } = await insertUserDetails({
        id: user.id,
        handle: this.handleInput,
        balance: BALANCE,
      });

      console.log(data, error2);

      if (error2) console.error("user details insert problem", error2);

      if (data) {
        const userDetails = {
          id: user.id,
          email: user.email,
          handle: data.handle,
          userDetailsId: data.id,
          balance: data.balance,
        };
        this.$store.dispatch("setUserDetails", userDetails);
      }
    },
    async signOut() {
      const { error } = await signOut();
      console.log(error);
      if (!error) {
        console.log("no error returned from signOut()");
        this.$store.dispatch("setClearUser");
      }
    },
    async signIn() {
      const { user, session, error } = await signIn(
        this.emailInput,
        this.passwordInput
      );

      if (error) console.log(error);
      if (user) {
        this.$store.dispatch("setUser", user);
        const userDetails = await getUserDetails(user.id);
        if (userDetails.error) {
          console.log(userDetails.error);
        }
        if (userDetails.data) {
          console.log(userDetails.data);
          this.$store.dispatch("setUserDetails", userDetails.data);
          this.signinOpen = false;
        }
      }
    },
    resetUser() {
      this.$store.dispatch("resetUser");
    },
  },
  async beforeMount() {},
};
</script>