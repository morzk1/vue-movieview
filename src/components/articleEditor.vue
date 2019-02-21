<template>
  <div class="container">
    <!-- {{articleInfo}} -->
    <Card class="main">
      <Input v-model="articleinfo.articleTitle" placeholder="标题" >
        <label slot="prepend">文章标题</label>
      </Input>
      <Input v-model="articleinfo.articleContext" placeholder="内容" type="textarea" :autosize="{minRows: 5,maxRows: 10}">
      </Input>
      <div class="button-group">
        <Button type="primary" @click="update">修改文章</Button>
        <Button type="error" @click="del">删除文章</Button>
        <Button type="success" @click="post">发布新文章</Button>

      </div>
    </Card>             
  </div>
</template>
<script>
import serverSrc from '../commen/commen.js'
  export default{
    props:[
      'articleinfo',
    ],
    methods:{
      update(){
        let postData ={
          articleId : this.articleinfo.articleId,
          articleTitle:this.articleinfo.articleTitle,
          articleContext:this.articleinfo.articleContext,
          id:localStorage._id,
          username:localStorage.username,
          token:localStorage.token,
        };
        this.$http.post(serverSrc.src + '/admin/articleupdate',postData).then(data =>{
          if(data.body.status == 1){
            alert(data.body.message)
          }else {
            alert('修改成功!')
            this.$emit('refresharticle', data)
          }
        })
      },
      post(){
        let postData ={
          articleTitle:this.articleinfo.articleTitle,
          articleContext:this.articleinfo.articleContext,
          id:localStorage._id,
          username:localStorage.username,
          token:localStorage.token,
        };
        this.$http.post(serverSrc.src + '/admin/addArticle',postData).then(data =>{
          if(data.body.status == 1){
            alert(data.body.message)
          }else {
            alert('发布成功!')
            this.$emit('refresharticle', data)
          }
        })
      },
      del(){
        if(window.confirm('你确定要取消删除吗？')){
                let postData ={
                articleId : this.articleinfo.articleId,
                id:localStorage._id,
                username:localStorage.username,
                token:localStorage.token,
                 };
              this.$http.post(serverSrc.src + '/admin/delArticle',postData).then(data =>{
                if(data.body.status == 1){
                  alert(data.body.message)
                }else {
                  alert('删除成功!')
                  this.$emit('refresharticle', data)
                }
                 })
          }else{
              return false;
          }
        
      }
    }
  }
</script>