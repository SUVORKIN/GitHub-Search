import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResult: {},
    searchHistoryArr: [],
    isLoading: false
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    },
    saveResults (state, { query, response }) {
      let resultKey = query.text + '/' + query.time
      Vue.set(state.searchResult, resultKey, { query: query.text, data: response.data })
      if (Object.keys(state.searchResult).length > 3) {
        let properties = Object.entries(state.searchResult)
        delete state.searchResult[properties[0][0]]
      }
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
      commit('set', { type: 'isLoading', val: true })
      axios
        .get('https://api.github.com/search/repositories?q=' + query.text + '+language:javascript&sort=stars&order=desc')
        .then(function (response) {
          commit('saveResults', { query, response })
          commit('saveHistory', { query, response })
          commit('set', { type: 'isLoading', val: false })
        }
        )
    },
    clearHistory ({ commit }) {
      commit('set', { type: 'searchHistoryArr', val: [] })
    }
  },
  getters: {
    searchResult (state) {
      return state.searchResult
    },
    searchHistoryArr (state) {
      return state.searchHistoryArr
    },
    isLoading (state) {
      return state.isLoading
    }
  }
})
