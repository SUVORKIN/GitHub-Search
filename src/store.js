import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResult: {},
    searchHistoryArr: []
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    },
    saveResults (state, { query, response }) {
      let resultKey = query.text + '/' + query.time
      Vue.set(state.searchResult, resultKey, { query: query.text, data: response.data })
      // state.searchResult[resultKey] = response.data
    },
    saveHistory (state, { query, response }) {
      let historyItem = {
        query: query.text,
        time: query.time,
        resultsCount: response.data.total_count
      }
      state.searchHistoryArr.push(historyItem)
    }
  },
  actions: {
    getApiData ({ commit }, query) {
      axios
        .get('https://api.github.com/search/repositories?q=' + query + '+language:javascript&sort=stars&order=desc')
        .then(function (response) {
          commit('saveResults', { query, response })
          commit('saveHistory', { query, response })
        }
        )
    }
  },
  getters: {
    searchResult (state) {
      return state.searchResult
    },
    searchHistoryArr (state) {
      return state.searchHistoryArr
    }
  }
})
