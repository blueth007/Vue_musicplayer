<template>

  <el-row>
    <el-col :span="6">
      <div class="title">
        <i class='el-icon el-icon-s-home'
           @click="BackIndex()">
          音乐台
        </i>
      </div>
    </el-col>

    <el-col :span="12"
            :offset="6">
      <div class="search ">
        <el-input size="medium"
                  suffix-icon="el-icon-search"
                  placeholder="请输入内容"
                  v-model="searchValue"
                  @keyup.enter.native="searchSongs()">

        </el-input>
      </div>
    </el-col>

  </el-row>

</template>

<script>

export default {
  name: 'Header',
  components: {

  },
  props: {

  },
  data () {
    return {
      searchValue: '海阔天空'

    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    BackIndex () {
      this.$store.commit('musicList/setList', [])
    },
    searchSongs () {
      console.log(123)
      if (this.searchValue.length === 0) {
        return
      }
      // this.$http.get('/search?keywords=' + this.searchValue).then(response => {
      //   // 保存内容
      //   this.musicList = response.data.result.songs
      //   console.log(this.musicList)
      // })
      // vuex方法
      this.$store.dispatch('musicList/getLists', this.searchValue)
      // 清空搜索
      this.searchValue = ''
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 24px;
  font-family: '华文行楷', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  font-weight: 870;
  i {
    cursor: pointer;
  }
}
.search {
  width: 75%;
  float: right;
}
.el-row {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
