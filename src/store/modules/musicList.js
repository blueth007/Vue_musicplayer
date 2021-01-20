import axios from 'axios'
const state = () => ({
  isPlay: false,
  playingId: 0,
  posterImg: '',
  musicUrl: '',
  musicList: []
})
const mutations = {
  setList: (state, val) => {
    state.musicList = [...val]
  },
  setMusciUrl: (state, url) => {
    state.musicUrl = url
  },
  setisPlay: (state, flag) => {
    state.isPlay = flag
  },
  setPoster: (state, img) => {
    state.posterImg = img
  },
  setPlayID: (state, id) => {
    state.playingId = id
  }

}

const actions = {
  getLists: ({
    commit,
    state
  }, query) => {
    axios.get('/search?keywords=' + query).then(response => {
      var musicList = response.data.result.songs
      commit('setList', musicList)
      // console.log(musicList)
    })
  },
  getMusicUrl: ({
    commit
  }, musicId) => {
    axios.get('/song/url?id=' + musicId).then(resp => {
      // console.log(resp.data)
      commit('setMusciUrl', resp.data.data[0].url)
      commit('setPlayID', resp.data.data[0].id)
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
