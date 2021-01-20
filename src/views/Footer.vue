<template>

  <div class="audioBtn"
       @mouseenter='mouseover'
       @mouseleave='mouseout'>
    <transition name="slide-fade">
      <div v-show='show'>
        <audio ref='audio'
               @play="play"
               @pause="pause"
               controls
               autoplay
               @onLoadedmetadata='onLoadedmetadata'
               @canplay="canPlay"
               loop>
          <source :src="musicUrl"
                  type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
    </transition>

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
      show: true
    }
  },
  watch: {
    playingId (newName, oldName) {
      console.log(newName, oldName)
      if (newName !== oldName) {
        this.$refs.audio.src = this.musicUrl
        // if (this.$refs.audio) { this.$refs.audio.load() }
      }
    },
    isPlay (newflag) {
      if (this.playingId === 0 || this.musicUrl === '') return
      newflag ? this.$refs.audio.play() : this.$refs.audio.pause()
    }
  },
  computed: {
    ...mapState({
      musicUrl: state => state.musicList.musicUrl,
      playingId: state => state.musicList.playingId,
      isPlay: state => state.musicList.isPlay
    })
  },
  methods: {
    mouseover () { this.show = true },
    mouseout () { this.show = false },
    startPlayOrPause () {
      return this.isPlay ? this.pause() : this.play()
    },
    play () {
      this.$store.commit('musicList/setisPlay', true)
      console.log('palying')
    },
    pause () {
      //  this.$refs.audio.pause()
      this.$store.commit('musicList/setisPlay', false)
    },
    onLoadedmetadata (res) {
      console.log('loadedmetadata')
      console.log(res)
    },
    canPlay () {
      // console.log('canplay')
    }

  },
  created () {

  },
  mounted () {
    this.$refs.audio.controlsList = 'nodownload'
  }
}
</script>
<style lang="scss" scoped>
audio {
  margin-top: 6px;
  outline: none;
  width: 100%;
  transition: all 0.5s ease;
}

.audioBtn {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 1.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  // transform: translateX(10px);
  margin-top: 60px;
}
</style>
