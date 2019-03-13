<template>
  <v-card>
    <v-container>
      <v-layout wrap align-center>
        <v-flex xs12 lg3 class="pb-2">
          <h2>Find js in GitHub</h2>
        </v-flex>
        <v-flex grow>
          <v-text-field v-model="query" hide-details label="Type query"></v-text-field>
        </v-flex>
        <v-flex shrink>
          <v-btn :disabled="!query" class="white--text" color="green" @click="sendQuery">Send</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    sendQuery () {
      if (this.query) {
        let date = new Date()
        let query = {
          time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
          text: this.query
        }
        this.$store.dispatch('getApiData', query)
      }
    }
  }
}
</script>
