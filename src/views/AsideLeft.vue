<template>
  <div class="aside-left">
    <div class="scroll"
         v-if="musicList.length!=0">
      <ListItem v-for="item  in musicList"
                :key="item.id"
                :song="item"> </ListItem>
    </div>
    <DefalutLeft v-if="musicList.length==0"></DefalutLeft>
  </div>
</template>

<script>
import DefalutLeft from '../components/defaultLeft'
import ListItem from '../components/List'
import { mapState } from 'vuex'
export default {
  name: 'AsideLeft',
  components: {
    ListItem,
    DefalutLeft
  },
  props: {

  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      musicList: state => state.musicList.musicList
    })
  },
  methods: {
    getLists () {
      this.$http.get('/top/song?type=0&t=1610611969303&limit=20').then(data => {
        console.log(data.data)
      })
    }

  },
  created () {

  },
  mounted () {
    // this.getLists()
    console.log(this.musicList)
  }
}
</script>
<style lang="scss" scoped>
.aside-left {
  height: inherit;
  margin-right: -20px;
  .scroll {
    height: inherit;
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
