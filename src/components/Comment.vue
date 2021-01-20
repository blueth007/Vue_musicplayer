<template>
  <div class="commentItem">
    <el-card :body-style="{'padding':'5px'}">
      <el-row>
        <el-col :span="8"
                class="avator">
          <img :src="comment.user.avatarUrl||'../assets/images/person.png'" />
        </el-col>
        <el-col :span="16">
          <h4>{{comment.user.nickname||'用户匿名'}}</h4>
          <p>{{comment.content||"暂无评论"}}</p>
          <p>
            <i class="liked"></i> ({{comment.likedCount}})
            <span class="commentime">{{FormatTime(comment.time)}}</span>
          </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    comment: Object
  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    FormatTime (time) {
      return new Date(time).toLocaleDateString()
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.commentItem {
  .el-card {
    padding-right: 14px;
    border: transparent;
    background-color: transparent;
  }
  .avator {
    text-align: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  h3,
  h4,
  h5,
  p {
    margin: 5px 0;
  }
  p {
    font-size: 12px;
  }
  i.liked {
    display: inline-block;
    height: 15px;
    width: 15px;
    vertical-align: bottom;
    background-image: url('../assets/images/heart.png');
    background-size: cover;
  }
  .commentime {
    float: right;
  }
}
</style>
