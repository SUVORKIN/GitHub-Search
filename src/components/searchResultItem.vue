<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      pointer
      flat
      :color="`${hover ? 'grey lighten-3' : 'white'}`"
      class="ma-2 search-result-item"
    >
      <v-card-text>
        <v-layout justify-space-between>
          <v-flex class="text-xs-left">{{_item.name}}</v-flex>
          <v-flex xs1>{{_item.stargazers_count}}</v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'serachResultItem',
  props: {
    _item: {
      type: Object,
      default: null
    }
  },
  computed: {
    stars () {
      return ''
    }
  }
}
</script>

<style>
.search-result-item {
  cursor: pointer;
}
</style>
