<template>
  <v-card>
    <v-flex xs12>
      <v-tabs show-arrows>
        <v-tabs-slider color="red"></v-tabs-slider>
        <v-tab v-for="(tab,i) in tabs" :key="i">{{ tab.query }}</v-tab>
        <v-tabs-items>
          <v-tab-item v-for="(tab,i) in tabs" :key="i">
            <v-card flat class="pa-1">
              <!-- {{searchResult[tab.key]}} -->
              <searchresultsTabContent :_key="tab.key"/>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
  </v-card>
</template>

<script>
import searchresultsTabContent from '@/components/searchresultsTabContent'

export default {
  name: 'searchResults',
  computed: {
    tabs () {
      let searchResult = this.searchResult
      let tabs = []
      for (let item in searchResult) {
        tabs.push({ query: searchResult[item].query, key: item })
      }
      return tabs || []
    },
    searchResult () {
      return this.$store.getters.searchResult || {}
    }
  },
  components: {
    searchresultsTabContent
  }
}
</script>
