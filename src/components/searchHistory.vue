<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <template v-slot:header>
        <div>История поиска</div>
      </template>
      <v-card>
        <searchHistoryItem v-for="(item,i) in historyItems" :key="i" :_item="item"/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat dark>Очистить</v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import searchHistoryItem from '@/components/searchHistoryItem'
export default {
  name: 'searchHistory',
  computed: {
    historyItems () {
      let historyItems = this.$store.getters.searchHistoryArr
      // let searchHistory = !this.isEmpty(this.$store.getters.searchHistory) ? this.$store.getters.searchHistory : JSON.parse(window.localStorage.searchHistory)
      // for (let item in this.searchHistory) {
      //   historyItems.push(this.searchHistory[item])
      // }
      return historyItems || []
    }
  },
  methods: {
    isEmpty (obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    }
  },
  components: {
    searchHistoryItem
  }
}
</script>
