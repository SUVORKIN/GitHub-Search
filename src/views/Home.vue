<template>
  <v-container>
    <v-layout column>
      <v-flex mt-3>
        <search/>
      </v-flex>
      <v-flex mt-3>
        <searchHistory/>
      </v-flex>
      <v-flex mt-3>
        <searchResults/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import search from '@/components/search'
import searchHistory from '@/components/searchHistory'
import searchResults from '@/components/searchResults'

export default {
  name: 'home',
  components: {
    search,
    searchHistory,
    searchResults
  }
}
</script>
