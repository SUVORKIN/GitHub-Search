<template>
  <div>
    <v-progress-circular v-if="isLoading" size="70" :width="5" color="red" indeterminate></v-progress-circular>
    <v-card v-else-if="!isMobileView">
      <v-flex v-if="tabs.length>1" xs12>
        <v-tabs grow show-arrows>
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tab v-for="(tab,i) in tabs" :key="i">{{ tab.query }}</v-tab>
          <v-tabs-items>
            <v-tab-item v-for="(tab,i) in tabs" :key="i">
              <div class="pa-1">
                <searchResultsTabContent :_searchResult="tab.data.items"/>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
      <v-flex v-else-if="tabs.length">
        <v-card flat class="pa-1">
          <searchResultsTabContent :_searchResult="searchResultArr[0].data.items"/>
        </v-card>
      </v-flex>
    </v-card>
    <div v-else>
      <v-card v-for="(tab,i) in tabs" :key="i" class="mb-3">
        <v-card-title>
          <h3>{{tab.query}}</h3>
        </v-card-title>
        <searchResultsTabContent :_searchResult="tab.data.items"/>
      </v-card>
    </div>
  </div>
</template>

<script>
import searchResultsTabContent from '@/components/searchResultsTabContent'

export default {
  name: 'searchResults',
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    tabs () {
      return this.searchResultArr
    },
    searchResultArr () {
      return this.$store.getters.searchResultArr || []
    },
    isMobileView () {
      if (this.windowWidth < 600) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  components: {
    searchResultsTabContent
  }
}
</script>
