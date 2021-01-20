import axios from 'axios'
const state = () => ({
  commentList: []
})
const mutations = {
  setList: (state, val) => {
    state.commentList = [...val]
  }
}

const actions = {
  getLists: ({
    commit,
    state
  }, musicId) => {
    axios.get('/comment/hot?type=0&id=' + musicId).then(response => {
      var commentList = response.data.hotComments
      commit('setList', commentList)
      // console.log(commentList)
    })
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
