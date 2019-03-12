<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex class="text-xs-left">
        <a href="/sa">{{_item.name}}</a>
      </v-flex>
      <v-flex xs1>Stars</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'serachResultItem',
  props: {
    _item: {
      type: Object,
      default: null
    }
  }
}
</script>
