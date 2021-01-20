import Vue from 'vue'
import Vuex from 'vuex'
import musicList from './modules/musicList'
import commentList from './modules/commentsList'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    musicList,
    commentList
  }

})
