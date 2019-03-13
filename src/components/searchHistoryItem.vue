<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex class="text-xs-left">
        {{_item.query}}
        - {{_item.time}}
      </v-flex>
      <v-flex class="text-xs-center" xs1>{{_item.resultsCount}}</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'searchHistoryItem',
  props: {
    _item: {
      type: Object,
      default: null
    }
  }
}
</script>
