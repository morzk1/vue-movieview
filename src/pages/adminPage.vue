<template lang="html">
    <!--此页面需要-->
  <div class="container">
    <div>
        <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
    </div>
    <div class="userMessage">
        <user-message></user-message>
    </div>
    <div class="MainContainer">
      <Tabs>
        <TabPane label="添加电影" icon="md-add-circle">
          <movie-Add-Table></movie-Add-Table>
        </TabPane>
        <TabPane :label="movielistTab" icon="md-videocam">
          <movie-Admin-Table ref="mychild"></movie-Admin-Table>
            <!-- <Table border :columns="columns" :data="movieList"></Table> -->
        </TabPane>
        <TabPane :label="indeximgsTab" icon="md-albums">
          <movie-recommend ref="mychild2"></movie-recommend>
        </TabPane>
        <TabPane label="发布文章" icon="md-paper">
          <article-admin-table></article-admin-table>
        </TabPane>
        <!-- <TabPane label="评论审核" icon="md-list-box">
          
        </TabPane>
        <TabPane label="用户列表" icon="md-person">
          
        </TabPane> -->
      </Tabs>
    </div>
  </div>





</template>

<script>

import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import UserMessage from '../components/UserMessage'
import movieAddTable from '../components/movieAddTable'
import movieAdminTable from '../components/movieAdminTable'
import movieRecommend from '../components/movieRecommend'
import articleAdminTable from '../components/articleAdminTable'
import serverSrc from '../commen/commen.js'
export default {
  created(){
    document.title = "控制台"
  },
  name: 'adminPage',
  // created () {
  //   this.refreshMovieList();
  // },
  data () {
    return {
      indeximgsTab:(h)=>{
        return h('span',['首页轮播图设置  ',
                    h('Icon',{
                      props:{
                       type:"md-refresh"
                      },
                      on:{
                        click : () =>{
                          this.refreshRcmd();
                        }
                      }
                  })
        ])
      },
      movielistTab:(h) =>{ //自定义表头
        return h('span',['视频列表  ',
                    h('Icon',{
                      props:{
                       type:"md-refresh"
                      },
                      on:{
                        click : () =>{
                          this.refreshMovieList()
                        }
                      }
                  })
        ])
      },
      // movieList:[],
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
    movieAddTable,
    movieAdminTable,
    movieRecommend,
    articleAdminTable,
  },

//  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  
  methods:{
    
    refreshMovieList(){
      this.$refs.mychild.refreshMovieList()
    },
    refreshRcmd(){
      this.$refs.mychild2.refreshRcmd()
    },
    

  } //of methods
}
</script>

<style scoped>

</style>