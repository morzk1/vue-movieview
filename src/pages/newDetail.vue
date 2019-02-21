<template lang="html">
<!--此页面需要-->
  <div class="container">
    <div>
      <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
    </div>
    <div class="contentMain">
        <h1>{{detail.articleTitle}}</h1>
        <div>{{detail.articleTime}}</div>
        <div class="contentText" style="display: flex; justify-content: center;">
          <div class="content" style="width:95%;">
              {{detail.articleContext}}
          </div>
        </div>
    </div>
      <Divider orientation="center" style="font-size: 20px;">评论</Divider>
      <comment v-bind:movie_id="article_id" style="flex:1;"></comment>
    <div>
      <common-footer></common-footer>  <!--  展示引入的footer组件 -->
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import Comment from '../components/Comment.vue'
import serverSrc from '../commen/commen.js'

let article_id=0
export default {
  name: 'NewDetail',
  data () {
    return {
      detail: [],
      article_id:'',
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment,
  },

//  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created () {
//    this.$route.query.id
    article_id=this.$route.query.id
    this.article_id=article_id
    this.$http.post(serverSrc.src + '/articleDetail',{article_id: article_id}).then((data) => {
      this.detail = data.body.data[0];
      this.detail.articleTime = new Date(parseInt(this.detail.articleTime)).toLocaleString();
      document.title = this.detail.articleTitle;
//      console.log( data.body.data)
    })
  },
  methods:{
  }
}
</script>

<style lang="css" scoped>
  .container {
    width: 100%;
    margin: 0 auto;

    min-height: 100vh;
    display: flex;
    flex-flow:column;
  }
  .contentMain{
    padding-top: 10px;
  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
