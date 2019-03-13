<template>
  <v-expansion-panel v-if="historyItems.length">
    <v-expansion-panel-content>
      <template v-slot:header>
        <div>Search history</div>
      </template>
      <v-card>
        <searchHistoryItem v-for="(item,i) in historyItems" :key="i" :_item="item"/>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clearHistory" color="red" depressed dark>Clear</v-btn>
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
      return historyItems || []
    }
  },
  methods: {
    clearHistory () {
      this.$store.dispatch('clearHistory')
    }
  },
  components: {
    searchHistoryItem
  }
}
</script>
