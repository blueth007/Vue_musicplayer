<template>
  <div class="item">
    <div :class="['song',this.playingId===song.id?'active':'']"
         :title="song.name"
         @click="getMusic(song.id)">
      <span class="songIcon"></span>
      <span class="songName">{{song.name}} </span>
      <span class="songer">{{song.artists[0].name}} </span>
      <span class="songDuration"> {{formatMs(song.duration)}} </span>
    </div>
    <span class="mv-icon"
          v-if="song.mvid&&song.mvid!=0"
          @click.self="playMv(song)">
    </span>
    <el-dialog custom-class='dialogStyle'
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <video :src="this.mvUrl"
             ref="video"
             controls></video>

    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Item',
  components: {

  },
  props: {
    song: Object
  },
  data () {
    return {
      dialogVisible: false,
      mvUrl: ''
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
    getMusic (musicId) {
      // 切换播放暂停
      this.isPlay ? this.$store.commit('musicList/setisPlay', false) : this.$store.commit('musicList/setisPlay', true)
      if (musicId !== this.playingId) {
        this.$store.dispatch('musicList/getMusicUrl', musicId).then(() => {
          setTimeout(() => this.$store.commit('musicList/setisPlay', true), 1000)
        })
        this.$store.dispatch('commentList/getLists', musicId)
        this.$store.commit('musicList/setPoster', this.song.artists[0].img1v1Url)
      }
    },
    playMv (song) {
      const mvid = song.mvid
      console.log(mvid)
      this.$http.get('/mv/url?id=' + mvid).then(resp => {
        console.log(resp.data.data.url)
        this.mvUrl = resp.data.data.url
        this.$refs.video.onloadstart = () => {
          // this.$store.commit('musicList/setPlayID', song.id)
          this.$refs.video.play()
        }
      })
      this.dialogVisible = true
    },
    formatMs (second) {
      // const h = Math.floor(second / 1000 / 3600)
      const m = Math.floor(second / 1000 / 60 % 60)
      const s = Math.floor(second / 1000 % 60)
      return m + ':' + s
    },
    handleClose (done) {
      this.dialogVisible = false
      this.$refs.video.pause()
    }

  },
  created () {

  },
  mounted () {
    // console.log(this.song)
  }
}
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  overflow: hidden;
  padding: 5px 8px;
  font-size: 12px;
  cursor: pointer;
  .song {
    border-radius: 3px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }

  .songName,
  .songer {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .songName {
    width: 35%;
  }
  .songer {
    max-width: 30%;
    margin-right: 10px;
  }
  .songIcon,
  .mv-icon {
    width: 23px;
    height: 23px;
    background: url('../assets/images/table.png') no-repeat;
  }
  .songIcon {
    background-position: -17px -22px;
  }
  .mv-icon {
    position: absolute;
    right: 10px;
    top: 5px;
    background-position: -30px -45px;
  }
}
.item:hover {
  background-color: #ccc;
}
.active {
  background-color: #adffee;
}
::v-deep .dialogStyle {
  width: 80%;
  height: 720px;
  background-color: transparent;
  video {
    width: 100%;
  }
}
</style>
