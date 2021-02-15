<template>
  <div class="space-y-3">
        <div class="flex justify-center">
    <p>SHARE GAME</p>
        </div>
            <div class="flex justify-center">
    <img class="block w-48" src="../../assets/qr-code.png" />
            </div>
                <div class="flex justify-center">
    <button class="btn block" @click="goForward">Continue</button>
                </div>
              <div class="flex justify-center">
    <button class="btn" @click="back">Back</button>
              </div>
            </div>
  </div>
</template>

<script>
export default {
  name: "share",
  methods: {
    goForward() {
      this.$store.dispatch("setSequence", "gameplay");
    },
    back() {
      this.$store.dispatch("setSequence", "confirmation");
    },
  },
};
</script>
