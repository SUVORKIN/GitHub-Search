import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResultArr: [],
    searchHistoryArr: [],
    isLoading: false
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    },
    saveResults (state, { query, response }) {
      let searchResultArr = [...state.searchResultArr]
      searchResultArr.unshift({ query: query.text, data: response.data })
      if (searchResultArr.length > 3) {
        searchResultArr.pop()
      }
      state.searchResultArr = searchResultArr
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
    searchResultArr (state) {
      return state.searchResultArr
    },
    searchHistoryArr (state) {
      return state.searchHistoryArr
    },
    isLoading (state) {
      return state.isLoading
    }
  }
})
