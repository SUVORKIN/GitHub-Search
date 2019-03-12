<template>
  <div>
    <searchResultItem v-for="(item,i) in pages[page-1]" :key="i" :_item="item"/>
    <v-container>
      <div class="text-xs-center pb-3">
        <v-pagination color="red" v-model="page" :length="pages.length"></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import searchResultItem from '@/components/searchResultItem'
export default {
  name: 'searchresultsTabContent',
  data () {
    return {
      page: 1
    }
  },
  props: {
    _searchResult: Object
  },
  computed: {
    pages () {
      let searchResult = this._searchResult
      let searchResultItems = []
      for (let item in searchResult) {
        searchResultItems.push(searchResult[item])
      }
      let pages = []
      let pageSize = 10
      let pagesCount = Math.ceil(searchResultItems.length / pageSize)
      let start = 0
      for (let i = 0; i <= pagesCount - 1; i++) {
        let page = []
        for (let j = 0; j <= pageSize - 1; j++) {
          if (searchResultItems[j + start]) {
            page.push(searchResultItems[j + start])
          }
        }
        start += pageSize - 1
        pages.push(page)
      }
      return pages
    }
  },
  components: {
    searchResultItem
  }
}
</script>
