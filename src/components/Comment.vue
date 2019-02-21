<template lang="html">
<div>


  <div style="padding: 5px">
      <!-- <textarea v-model="context" style="width: 80%;" placeholder="内容"></textarea> -->
      <Input v-model="context" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 95%;" placeholder="发言请遵守法律法规..." />
  </div>
  <div style="margin: 5px 0 10px 0;">
      <!-- <button v-on:click="send_comment">评论</button> -->
      <Button @click="send_comment" type="primary" style="width:95%;">评论</Button>
  </div>
  <div style="display: flex; flex-direction: column-reverse; align-items: center; ">
    <!-- <li v-for="item in items">
      {{ item.username }}评论：{{item.context}}
    </li> -->
    <!-- <Page :total="items.length" :page-size="5"/> -->
    <Card v-for="item in items" style="width: 95%;text-align:left;margin-bottom: 10px;">
        <p slot="title">{{ item.username }}评论：</p>
        <p>{{item.context}}</p>
    </Card>
  </div>
</div>

</template>
<!--这里获取所有的评论，并且可以进行评论,对于文章详情页也可以使用-->
<script>
import serverSrc from '../commen/commen.js'
export default {
  props:['movie_id'],
  data () {
    return {
      items:[],
      context:'',
    }
  },
  created(){
//    获得所有的评论
//    console.log(this.movie_id)
    this.$http.post(serverSrc.src + '/movies/comment',{id:this.movie_id}).then((data) => {
      if(data.body.status==0){
        this.items=data.body.data
      }else{
        alert("获得失败")
      }
    })
  },
  methods:{
    send_comment(event){
      let send_data;
        if(typeof(localStorage.username)!="undefined"){
        send_data={
          movie_id:this.movie_id,
          context:this.context,
          username:localStorage.username
        }
      }else{
        send_data={
          movie_id:this.movie_id,
          context:this.context,
        }
      }

      this.$http.post(serverSrc.src + '/users/postComment',send_data).then((data) => {
          alert(data.body.message)
          this.$http.post(serverSrc.src + '/movies/comment',{id:this.movie_id}).then((data) => {
            if(data.body.status==0){
              this.items=data.body.data
            }else{
              alert("评论刷新失败")
            }
          })
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
