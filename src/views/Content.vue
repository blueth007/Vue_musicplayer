<template>
  <div class="playBtn"
       @click="Play()">
    <img id='playbar'
         :class="isPlay?'palying':'paused'"
         src='../assets/images/play-bar.png'
         alt="playbar" />
    <div :class="['dicsCover', isPlay?'toggleplay':'' ]">

      <img id='disc'
           src="../assets/images/disc.png"
           alt="disc" />
      <img id='cover'
           :src='posterImg'
           alt="cover" />

    </div>
    <img id="ispaused"
         v-show="!isPlay"
         src="../assets/images/play.png"
         alt="ispaused" />
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
      // isPlay: false
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      isPlay: state => state.musicList.isPlay,
      playingId: state => state.musicList.playingId,
      posterImg: state => {
        const posterImg = state.musicList.posterImg
        return posterImg === '' ? require('../assets/images/cover.png') : posterImg
      }
    })
  },
  methods: {
    Play () {
      if (this.playingId === 0) return
      this.$store.commit('musicList/setisPlay', !this.isPlay)
      this.$message.closeAll()
      if (!this.isPlay) {
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
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.playBtn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  #playbar {
    position: absolute;
    z-index: 2;
    top: 10%;
    left: 50%;
    transition: all 1s ease;
    -webkit-transition: all 1s ease;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
  }
  .palying {
    -webkit-transform: rotate(6deg);
    -ms-transform: rotate(6deg);
    transform: rotate(6deg);
  }
  .paused {
    -webkit-transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    transform: rotate(-30deg);
  }
  .dicsCover {
    position: relative;
    -webkit-animation: playingRound 6s 1.2s linear infinite; /* Safari 与 Chrome */
    animation: playingRound 6s 1.2s linear infinite;
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
    #cover {
      position: absolute;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .toggleplay {
    -webkit-animation-play-state: running;
    animation-play-state: running;
  }

  #ispaused {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  @keyframes playingRound {
    from {
      -webkit-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes playingRound /* Safari 与 Chrome */ {
    from {
      -webkit-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
