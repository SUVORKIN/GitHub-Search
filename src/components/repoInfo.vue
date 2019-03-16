<template>
  <v-card>
    <v-container>
      <v-card-title>
        <h3>{{_repo.name}}</h3>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <v-layout justify-start column>
          <v-flex>
            <p>Description: {{_repo.description}}</p>
            <p>Forks: {{_repo.forks}}</p>
            <p>Open issues: {{_repo.open_issues}}</p>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <p>Owner: {{_repo.owner.login}}</p>
            <p>
              Link:
              <a :href="_repo.owner.html_url" target="new_blank">{{_repo.owner.html_url}}</a>
            </p>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn depressed color="red" dark @click="$emit('closeModal')">Close</v-btn>
        </v-layout>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'repoInfo',
  props: {
    _repo: Object
  }
}
</script>
