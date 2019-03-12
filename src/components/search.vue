<template>
  <v-card>
    <v-container>
      <v-layout justify-space-around align-center>
        <v-flex xs2>
          <h2>Find in GitHub</h2>
        </v-flex>
        <v-flex xs7>
          <v-text-field v-model="query" hide-details label="Ваш запрос"></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn depressed color="green" @click="sendQuery" dark>Найти</v-btn>
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
      let date = new Date()
      let query = {
        time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        text: this.query
      }
      this.$store.dispatch('getApiData', query)
    }
  }
}
</script>
