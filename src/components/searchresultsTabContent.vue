<template>
  <div data-app>
    <v-layout class="py-3">
      <v-flex shrink>
        <v-btn @click.stop="sortByName" flat fab small depressed>
          <span v-if="nameSortType === 'asc'">A-z</span>
          <span v-else>Z-a</span>
        </v-btn>
      </v-flex>
      <v-flex xs5>
        <v-text-field box v-model="nameFilter" hide-details label="Filter by name"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="text-xs-center" shrink>
        <v-btn @click="sortByScore" flat fab small depressed>
          <v-icon v-if="scoreSortType === 'desc'" dark>arrow_downward</v-icon>
          <v-icon v-else dark>arrow_upward</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-divider/>
    <div v-if="!filterMsg">
      <div @click.stop="openDetailsModal(item)" v-for="(item,i) in pages[page-1]" :key="i">
        <searchResultItem :_item="item"/>
      </div>
    </div>
    <div v-else>
      <v-container>{{filterMsg}}</v-container>
    </div>
    <v-dialog v-if="detailsModal" width="600" v-model="detailsModal">
      <div>
        <repoInfo :_repo="repoInfo" @closeModal="closeDetailsModal"/>
      </div>
    </v-dialog>
    <v-divider v-if="showPagination"></v-divider>
    <v-container>
      <div class="text-xs-center pb-3" v-if="showPagination">
        <v-pagination total-visible="5" color="red" v-model="page" :length="pages.length"></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import searchResultItem from '@/components/searchResultItem'
import repoInfo from '@/components/repoInfo'
export default {
  name: 'searchResultsTabContent',
  data () {
    return {
      page: 1,
      detailsModal: false,
      repoInfo: null,
      scoreSortType: 'desc',
      nameSortType: 'asc',
      searchResult: [],
      nameFilter: '',
      filterMsg: ''
    }
  },
  props: {
    _searchResult: Array
  },
  created () {
    this.searchResult = this._searchResult
  },
  watch: {
    nameFilter (string) {
      this.filterByName(string)
    }
  },
  computed: {
    showPagination () {
      return this.pages.length > 1
    },
    pages () {
      let searchResultItems = this.searchResult
      let pages = []
      let pageSize = 10
      let pagesCount = Math.ceil(searchResultItems.length / pageSize)
      let start = 0
      for (let i = 0; i <= pagesCount - 1; i++) {
        let page = []
        page = searchResultItems.slice(start, start + pageSize)
        start += pageSize
        pages.push(page)
      }
      return pages
    }
  },
  methods: {
    filterByName (string) {
      let searchResult = this.$store.getters.searchResultArr[0].data.items
      const matched = searchResult.filter(item => item.name.indexOf(string) > -1)
      if (!matched.length) {
        this.filterMsg = 'There are no matches'
      } else {
        this.filterMsg = ''
      }
      this.searchResult = matched
    },
    sortByScore () {
      this.toggleButton('scoreSortType')
      this.searchResult = this.searchResult.sort((a, b) => {
        if (this.scoreSortType === 'asc') {
          return a.score - b.score
        } else {
          return b.score - a.score
        }
      })
    },
    sortByName () {
      this.toggleButton('nameSortType')
      if (this.nameSortType === 'asc') {
        this.searchResult = this.searchResult.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
          return 0
        })
      } else {
        this.searchResult = this.searchResult.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1 }
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1 }
          return 0
        })
      }
    },
    toggleButton (type) {
      if (this[type] === 'asc') {
        this[type] = 'desc'
      } else {
        this[type] = 'asc'
      }
    },
    openDetailsModal (repoInfo) {
      this.repoInfo = repoInfo
      this.detailsModal = true
    },
    closeDetailsModal () {
      this.detailsModal = false
    }
  },
  components: {
    searchResultItem,
    repoInfo
  }
}
</script>
