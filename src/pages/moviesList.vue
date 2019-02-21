<template>
<!--此页面需要-->
  <div class="container">
    <div>
      <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
      <UserMessage></UserMessage>

    </div>
    <div class="contentMain">
      <div class="wrapper">
        <movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime" :movieImg="item.movieImg"></movies-list><!--引入MovieList-->
      </div>
      <div class="wrapperPages">
        <Page :total="movieItems.length" page-size="12" show-elevator />
      </div>
    </div>
    <div class="max">

    </div>
    <div>
      <common-footer></common-footer>  <!--  展示引入的footer组件 -->
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import MoviesList from '../components/MoviesList'
import UserMessage from '../components/UserMessage'
import serverSrc from '../commen/commen.js'
export default {
  name: 'movieList',
  data () {
    return {
      movieItems:[]
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    MoviesList,
    UserMessage,
  },

//  这里用于获取数据
  created () {
//    获取所有电影
    this.$http.get(serverSrc.src + '/movies/list').then((data) => {
      this.movieItems = data.body.data;
      // console.log( data.body)
      document.title = '全部电影'
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

    display: flex;
    flex-flow: column;
    min-height: 100vh;
    /* display: flex;
    flex-direction: row; */
  }
  .contentMain{
    padding-top: 10px;
    background-color: #fff;
  }
  .max{
    flex:1;

  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
  .contentMain > .wrapper::after{
    content: "";
    display: block;
    clear: both;
  }
  .wrapperPages{
    margin-bottom: 10px;
  }
</style>
