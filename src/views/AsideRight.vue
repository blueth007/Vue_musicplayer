<template>
  <div class="aside-right">
    <h3>评论列表</h3>
    <div class="scroll">
      <CommentItem v-for="item in commentsLists"
                   :key="item.commentId"
                   :comment="item"></CommentItem>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentItem from '../components/Comment'
export default {
  name: 'AsideRight',
  components: {
    CommentItem
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
      commentsLists: state => state.commentList.commentList.sort((a, b) => b.time - a.time)
    })
  },
  methods: {

  },
  created () {

  },
  mounted () {
    console.log(this.commentsLists)
  }
}
</script>
<style lang="scss" scoped>
.aside-right {
  height: inherit;
  margin-right: -20px;
  .scroll {
    height: inherit;
    width: 100%;
    overflow-y: scroll;
  }
  h3 {
    margin: 10px 0;
  }
}
</style>
