<template >
<!--此页面需要-->

  <div class="container">
    <div>
      <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div class="title-time" style="padding: 20px;">
      <h1>{{detail.movieName}}</h1>
      <h4>{{detail.movieTime}}发布</h4>
      <div class="wrapper">
        <div class="buttons">
          <div class="down" @click="movieDownload()">
            <Icon type="md-download" size="14"/>
            <span>下载</span>
          </div>
          <div class="thumb" @click="support()">
            <Icon type="md-thumbs-up" size="14"/>{{detail.movieNumSuppose}}
          </div>
        
          
        </div>
      </div>
    </div>
    

    <div class="contentMain">
      <player :detail="detail">

      </player>
    




    </div>
    <Divider orientation="center" style="font-size: 20px;">评论</Divider>
    <div style="flex:1;">
    <comment v-bind:movie_id="movie_id"></comment>
    </div>

    <div>
      <common-footer></common-footer>  <!--  展示引入的footer组件 -->
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import Comment  from '../components/Comment.vue'
import serverSrc from '../commen/commen.js'
import Player from '../components/player'
import UserMessage from '../components/UserMessage'

let movie_id=0
export default {
  name: 'MovieDetail',
  data () {
    return {
      detail: [],
      movie_id:'',
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment,
    Player,
    UserMessage,
    
  },

//  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created () {
//    this.$route.query.id
    this.movie_id=this.$route.query.id
    movie_id=this.$route.query.id
    this.$http.post(serverSrc.src + '/movies/detail',{id: movie_id}).then((data) => {
      this.detail = data.body.data;
      document.title = `${this.detail.movieName}-播放页`;
      this.detail.movieTime = new Date(parseInt(this.detail.movieTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
    //  console.log( data.body.data)
    })
    
  },
  methods:{
    support:function (event) {
      this.$http.post(serverSrc.src + '/movies/support',{id:movie_id}).then((data1)=>{
        let data_temp= data1.body
        let that=this
        // console.log(data_temp)
        if(data_temp.status===0){
          this.$http.post(serverSrc.src + '/movies/showNumber',{id:movie_id}).then((data2)=>{
//            console.log(data2)
            that.detail['movieNumSuppose']=data2.body.data.movieNumSuppose
          })
        }else{
          alert(data_temp.message)
        }

      })
    },
//    电影下载
    movieDownload:function (event) {
      this.$http.post(serverSrc.src + '/movies/download',{movie_id:movie_id}).then((data1)=>{
        if(data1.status==1){
          alert(data1.message)
        }else{
        //  console.log(data1.data.data)
          window.location=data1.data.data;
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .headerImg{
    height: 200px;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    
    min-height:100vh;
    display:flex;
    flex-flow:column;
    background-color: #f0f0f0;

  }
  .contentMain{
    /* padding-top: 150px; */
  }


  .movie-info img{
     margin-top:5px;
  }
 
 .wrapper{
  display: flex;
  align-items: center; 
  justify-content: center; 
  flex-direction: column;
}
.buttons{
  display: flex; 
  flex-direction: row;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
  padding:0;
  
}
.down,
.thumb{
  padding: 5px;

}
.down:hover,.thumb:hover{
  color:rgb(0, 162, 255);
}

</style>
