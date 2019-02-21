<template>
<!--此页面需要-->
<div class="container">
    <div>
        <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div>
        <index-header-pic :headerItems="headerItems"></index-header-pic>
    </div>
    <!-- <div class="container" style="display: flex; flex-flow: row wrap; justify-content: space-between; box-sizing: border-box;">
      <Card style="display: flex; flex-direction: column;  margin:0px 10px 0px 10px; flex:8;">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            电影
        </p>
          <div style="display: flex;flex-flow: row wrap; justify-content: center;">
              <movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieImg="item.movieImg" :movieName="item.movieName" :movieTime="item.movieTime"></movies-list>

          </div>
          
      </Card>
      <Card style="margin:0px 10px 0px 10px; flex:2">
        <p slot="title">
            <Icon type="md-paper"></Icon>
            新闻
        </p>
          <ul class="cont-ul">
            <news-list v-for="item in newsItems" :key="item._id" :id="item._id"  :articleTitle="item.articleTitle" :articleTime="item.articleTime"></news-list>
          </ul>
      </Card>
    </div> -->
    <div class="contentMain" >
      <div class="nav">
        <p>推荐 ></p>
      </div>
      <div class="leftbox">
        <movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieImg="item.movieImg" :movieName="item.movieName" :movieTime="item.movieTime"></movies-list>

      </div>
      <div class="rightbox">
        <!-- <news-list v-for="item in newsItems" :key="item._id" :id="item._id"  :articleTitle="item.articleTitle" :articleTime="item.articleTime"></news-list> -->

      </div>
    </div>
    <div class="footerDiv">
      <common-footer></common-footer>  <!--  展示引入的footer组件 -->
    </div> 
</div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import NewsList from '../components/NewsList'
import MoviesList from '../components/MoviesList'
import IndexHeaderPic from '../components/IndexHeaderPic'
import UserMessage from '../components/UserMessage'
import serverSrc from '../commen/commen.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      headerItems:[],
      newsItems:[],
      movieItems:[]
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    NewsList,
    MoviesList,
    IndexHeaderPic,
    UserMessage
  },

//  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created () {
    document.title = "首页-电影网站Demo"    
//主页推荐
    this.$http.get(serverSrc.src + '/showIndex').then((data) => {
      this.headerItems = data.body.data;
      // console.log( data.body.data)
    })
//    获取新闻
    this.$http.get(serverSrc.src + '/showArticle').then((data) => {
      this.newsItems = data.body.data;
      // console.log(data.body)
    })
//    获取所有电影
    this.$http.get(serverSrc.src + '/showRanking').then((data) => {
      this.movieItems = data.body.data;
      // console.log( data.body)x
    })
  },
  ready(){

  }
}
</script>

<style lang="css" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
    display: flex; 
  flex-flow: column; 
  min-height: 100vh;
  }
  .contentMain{
    padding-top: 15px;
    flex:1;
    width: 100%;
    background-color: #fff;
   
  }
  .contentMain > .nav{
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  .contentMain > .leftbox {

  }
  .contentMain > .leftbox::after{
    content: "";
    display: block;
    clear: both;
  }

</style>
