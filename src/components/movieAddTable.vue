<template>
        <Card>
                <div class="mv-add-box">
                <Input v-model="newMovie.movieName" placeholder="电影名称"> 
                  <label slot="prepend">电影名称</label>
                </Input>
                <Input v-model="newMovie.movieImg" placeholder="封面图片地址http://.."> 
                  <label slot="prepend">图片地址</label>
                </Input>
                <Input v-model="newMovie.movieVideo" placeholder="视频地址http://.."> 
                  <label slot="prepend">视频地址</label>
                </Input>
                <Input v-model="newMovie.movieDownload" placeholder="下载地址http://.."> 
                  <label slot="prepend">下载地址</label>
                </Input>
                <Checkbox v-model="newMovie.movieMainPage" >添加至首页推荐</Checkbox>
                <br>
                <Button @click="submitNewMovie">提交</Button>
    
                </div>
              </Card>
</template>

<script>
  import serverSrc from '../commen/commen.js'
export default {
  data(){
      return {
        newMovie:{
            movieName: "",
            movieImg: "",
            movieVideo: "",
            movieDownload: "",
            movieMainPage: false,
        }
      }
  },
  methods:{
    submitNewMovie(){
      // console.log(this.newMovie)
        this.newMovie.id = localStorage._id;
        this.newMovie.username = localStorage.username;
        this.newMovie.token = localStorage.token;
        this.$http.post(serverSrc.src + '/admin/movieAdd',this.newMovie).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
          alert('添加成功!')
          this.fresh();
        }
//        console.log( data.body.data)
      })
    },
    fresh:function(){
        this.newMovie ={
              movieName: "",
              movieImg: "",
              movieVideo: "",
              movieDownload: "",
              movieMainPage: false,
           };
        this.newMovie.id = localStorage._id;
        this.newMovie.username = localStorage.username;
        this.newMovie.token = localStorage.token;
    }
  }
}
</script>