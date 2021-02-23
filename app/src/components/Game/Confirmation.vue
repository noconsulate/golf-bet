<template>
  <div class="space-y-3">
    <div class="flex items-center flex-col">
      <p>LET'S GO!</p>
      <p>You're playing with {{ gameInfo.players }} players</p>
      <p>{{ gameInfo.holes }} holes</p>
      <p>for {{ gameInfo.points }} points.</p>
    </div>
    <div class="flex justify-center">
      <button class="btn" @click="confirm">Confirm game</button>
    </div>
    <div class="flex justify-center"></div>
    <div class="flex justify-center">
      <button @click="back" class="btn block">Back</button>
    </div>
    <div class="flex justify-center">
      <p>
        (By clicking confirm user agrees to terms of service. This application
        is not responsible for mitigating disputes. Disputed games will result
        in return of points to all parties.)
      </p>
    </div>
  </div>
</template>

<script>
import { db } from "../../utilities/firebase";

export default {
  name: "confirmation",
  data() {
    return {
      gameId: "",
    };
  },
  computed: {
    gameInfo() {
      return {
        players: this.$store.state.players,
        points: this.$store.state.points,
        holes: this.$store.state.holes,
      };
    },
  },
  methods: {
    async confirm() {
      let docRef;
      try {
        docRef = await db.collection("games").add({
          thing: "game",
        });
        this.gameId = docRef.id;
      } catch (error) {
        console.log(error);
      }

      console.log(docRef.id);

      // this.$store.dispatch("setSequence", "share");
    },
    back() {
      this.$store.dispatch("setSequence", "holes");
    },
  },
};
</script>
