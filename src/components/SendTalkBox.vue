<template >
<div>
  <div style="padding: 10px">
    <Input v-model="toUserName" placeholder="发送用户名" size="small" style="width:80%;" />
  </div>
  <div style="padding: 10px">
    <Input v-model="title" placeholder="发送标题" size="small" style="width:80%;" />
  </div>

  <div style="padding: 10px">
    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="context" style="width: 80%;" placeholder="内容" />
  </div>
  <div >
      <Button v-on:click="send_mail">发送站内信</Button>
  </div>

</div>

</template>
<script>
import serverSrc from '../commen/commen.js'
export default {
  props:[],
  data () {
    return {
      toUserName: '',
      context:'',
      title:'',
    }
  },
  methods:{
    send_mail(event){
      let send_data={
        token:localStorage.token,
        user_id:localStorage._id,
        toUserName:this.toUserName,
        title:this.title,
        context:this.context,
        fromUserName:localStorage.username,

      }
      this.$http.post(serverSrc.src + '/users/sendEmail',send_data).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
          alert('发送成功')
        }
//        console.log( data.body.data)
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
