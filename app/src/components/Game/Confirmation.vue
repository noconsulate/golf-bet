<template>
  <div class="space-y-3">
        <div class="flex justify-center">
    <p>
      LET'S GO!
    </p>
        </div>
            <div class="flex justify-center">
    <button class="btn" @click="confirm">Confirm game</button>
            </div>
        <div class="flex justify-center">
    <button @click="back" class="btn block">Back</button>
            </div>
        <div class="flex justify-center">
     <p>
      (By clicking confirm user agrees to terms of service. This application is not responsible for mitigating disputes. Disputed games will result in return of points to all parties.)
    </p>
            </div>
  </div>
</template>

<script>
export default {
  name: "confirmation",
  methods: {
    confirm() {
      this.$store.dispatch("setSequence", "share");
    },
    back() {
      this.$store.dispatch("setSequence", "holes");
    },
  },
};
</script>
