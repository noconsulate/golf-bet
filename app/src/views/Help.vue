<template>
  <div class="space-y-2 pt-8 px-5">
    <p class="text-justify">
      This is a golf scorecard app that lets you bet with your friends. It was
      originally supposed to be a full-featured PWA that would facilitate the
      betting of loyalty points, cryptocurrency, and cash and would include
      useful things like a course database. For now it remains a portfolio
      piece.
    </p>
    <p class="text-justify">
      If you're reading this it probably means your curious to see what I can do
      so I'll try to make it easy for you to check out the app.
    </p>
    <p class="text-justify">You can see the repo at:</p>
    <a
      href="https://github.com/noconsulate/golf-bet"
      class="text-blue-600"
      target="_blank"
      rel="noopener noreferrer"
      >https://github.com/noconsulate/golf-bet</a
    >
    <p class="text-justify">
      You'll need to create at least one user by visiting "Player" via the menu.
      A one player match will work but I encourage you to create multiple
      accounts so you can see the interactivity.
    </p>
    <p class="text-justify">
      After you've created a user or two go to "Match" and set up a game, being
      sure to set the number of players to the number of accounts you made.
      After you click "Let's Go!" copy the share link and log in to your other
      account using a different browser. Once the expected number of players
      have joined the game the scorecard will appear.
    </p>
    <p class="text-justify">
      Player 1, AKA the account that created the match, is responsible for
      filling in the scores which will populate for the other players. You can
      click "fill scores" at the bottom to fill up the scorecard with random
      scores. Once the scoring is done you can confirm the scores and the
      winner(s) and loser(s) are calculated.
    </p>
    <p>
      IF something gets stuck and you can't do anything it's surely a bug
      somewhere. Please go to the Player section and click "Reset user". This
      will reset your user to its default state and start everything over.
    </p>
    <p>Thanks for taking the time.</p>
    <p>Janssen Kuhn, 2021</p>
    <a href="mailto:janssenkuhn@mailbox.org"><Email /></a>
  </div>
</template>

<script>
import App from "../App.vue";
import Email from "../assets/email.vue";
export default {
  components: { Email },
  name: "Help",
};
</script>