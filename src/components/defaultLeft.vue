<template>
  <div class="default_left">
    <el-tabs @tab-click="handleClick">
      <el-tab-pane v-for="item in tagsList"
                   :key="item.name"
                   :value="item.name"
                   :label="item.name">
        <el-table :data="lists"
                  height="450"
                  highlight-current-row
                  :cell-style="{'text-align':'center'}"
                  @row-click='handleClickRow'
                  style="width: 100%">
          <el-table-column prop="name"
                           label="歌曲名">
            <template slot-scope="props">
              <div :title="props.row.name"
                   class="cellClass">
                {{ props.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="歌手"
                           prop="singer">
            <template slot-scope="props">
              <div :title="props.row.singer"
                   class="cellClass">
                {{ props.row.singer}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时长"
                           prop="duration">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="热门">热门</el-tab-pane>-->

    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      lists: [],
      tagsList: []
    }
  },
  watch: {
    isPlay (newState) {
      this.$message.closeAll()
      if (!newState) {
        this.$message({
          showClose: true,
          message: '播放暂停中',
          type: 'error',
          duration: 0
        })
      } else {
        this.$message({
          showClose: true,
          message: '播放开始',
          type: 'success'
        })
      }
    }
  },
  computed: {
    ...mapState({
      isPlay: state => state.musicList.isPlay,
      playingId: state => state.musicList.playingId
    })
  },
  methods: {
    handleClick (tab, event) {
      this.getList(tab.label)
    },
    getList (type) {
      // /top/playlist/highquality?limit=1&cat=%E6%B5%81%E8%A1%8C&t=1611046246792
      this.$http.get('top/playlist?limit=10&offset=0&cat=' + type + '&t=' + (new Date() - 1)).then(resp => {
        console.log(resp.data)
        const mostArr = resp.data.playlists.sort((a, b) => b.playCount - a.playCount)[0] // 寻找播放最多的播单
        console.log(mostArr)
        // https://autumnfish.cn/playlist/detail?id=3136952023&t=1611046917837
        this.$http.get('playlist/detail?id=' + mostArr.id + '&s=20&t=' + (new Date() - 1)).then(resp => {
          console.log(resp.data)
          // tracks 内含10首歌曲
          // this.lists = resp.data.playlist.tracks.map(item => {
          //   return {
          //     id: item.id,
          //     name: item.al.name,
          //     picUrl: item.al.picUrl,
          //     singer: item.ar[0].name,
          //     duration: this.formatMs(item.dt)
          //   }
          // })
          // trackIds 所有的 通过/song/detail?ids=347230,347231 获取所有歌曲
          const trackIds = resp.data.playlist.trackIds.map(item => item.id)
          this.$http.get('/song/detail?ids=' + trackIds.join()).then(resp => {
            console.log(resp.data)
            this.lists = resp.data.songs.map(item => {
              return {
                id: item.id,
                name: item.al.name,
                picUrl: item.al.picUrl,
                singer: item.ar[0].name,
                duration: this.formatMs(item.dt)
              }
            })
          })
        })
      })
    },
    getPlaylistHot () {
      this.$http.get('playlist/catlist').then(resp => {
        console.log(resp.data)
        resp.data.sub.map(item => {
          if (item.category === 1) { this.tagsList.push(item) }
        })
        this.getList('流行')
      })
    },
    handleClickRow (row, column, event) {
      console.log(row)
      const musicId = row.id
      this.isPlay ? this.$store.commit('musicList/setisPlay', false) : this.$store.commit('musicList/setisPlay', true)
      if (musicId !== this.playingId) {
        this.$store.dispatch('musicList/getMusicUrl', musicId).then(() => {
          setTimeout(() => this.$store.commit('musicList/setisPlay', true), 1000)
        })
        this.$store.dispatch('commentList/getLists', musicId)
        this.$store.commit('musicList/setPoster', row.picUrl)
      }
    },
    formatMs (second) {
      // const h = Math.floor(second / 1000 / 3600)
      const m = Math.floor(second / 1000 / 60 % 60)
      const s = Math.floor(second / 1000 % 60)
      return m + ':' + s
    }

  },
  created () {

  },
  mounted () {
    this.getPlaylistHot()
  }
}
</script>
<style lang="scss" scoped>
.default_left {
  font-size: 12px;
  .el-tabs {
    min-height: 100vh;
    margin-right: 20px;
    margin-left: 10px;
  }
  .el-table {
    height: inherit;
    font-size: 12px;
    cursor: pointer;
    background-color: transparent;
    tr,
    th,
    td {
      text-align: center;
    }
  }
  .el-tab-pane {
    margin-right: -20px;
  }
}
::v-deep .el-table,
::v-deep .el-table th,
::v-deep .el-table td,
::v-deep .el-table tr {
  padding: 8px 0 !important;
  text-align: center;
  background-color: transparent;
}
::v-deep .el-tabs__item {
  padding: 0 10px;
}
::v-deep .el-tabs__header {
  margin: 0;
}
.cellClass {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
