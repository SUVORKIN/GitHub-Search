<template>
  <div>
    <v-progress-circular v-if="isLoading" size="70" :width="5" color="red" indeterminate></v-progress-circular>
    <v-card v-else>
      <v-flex v-if="tabs.length>1" xs12>
        <v-tabs grow show-arrows>
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tab v-for="(tab,i) in tabs" :key="i">{{ tab.query }}</v-tab>
          <v-tabs-items>
            <v-tab-item v-for="(tab,i) in tabs" :key="i">
              <v-card flat class="pa-1">
                <searchResultsTabContent :_searchResult="searchResult[tab.key].data.items"/>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
      <v-flex v-else-if="tabs.length">
        <v-card flat class="pa-1">
          <searchResultsTabContent :_searchResult="searchResult[tabs[0].key].data.items"/>
        </v-card>
      </v-flex>
    </v-card>
  </div>
</template>

<script>
import searchResultsTabContent from '@/components/searchResultsTabContent'

export default {
  name: 'searchResults',
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    tabs () {
      let searchResult = this.searchResult
      let tabs = []
      for (let item in searchResult) {
        tabs.push({ query: searchResult[item].query, key: item })
      }
      return tabs
    },
    searchResult () {
      return this.$store.getters.searchResult || {}
    }
  },
  components: {
    searchResultsTabContent
  }
}
</script>
