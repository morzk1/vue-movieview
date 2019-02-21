<template lang="html">
  <div>
    <div>
    <div  v-show="showUserInfo">
    <div class="box">
             <label>输入用户名:</label>
    <input v-model="username" placeholder="用户名">
</div>
    <div class="box">
    <label>输入邮箱:</label>
    <input v-model="userMail" placeholder="邮箱">
    </div>
    <div class="box">
    <label>输入手机:</label>
    <input v-model="userPhone" placeholder="手机">
    </div>
    <div  class="box">
    <button v-on:click=checkUser()>找回密码</button>
</div>


</div>
<div  v-show="showRePassword" >
    <div class="box" >
    <label>输入新密码:</label>
    <input v-model="repassword" placeholder="输入新密码">
    </div>
     <div  class="box">
    <button v-on:click=changeUserPassword()>修改密码</button>
</div>
</div>
</div>


</div>

</template>
<script>
  import serverSrc from '../commen/commen.js'
  export default {
    created(){
    document.title = "找回密码"
    },
    data(){
      return{
        userMail:'',
        userPhone:'',
        username:'',
        repassword:'',
        showRePassword:false,
        showUserInfo:true,
      }
    },
    methods:{
      checkUser:function (event) {
      this.$http.post(serverSrc.src + '/users/findPassword',{username: this.username,userMail:this.userMail,userPhone:this.userPhone}).then((data) => {
        if(data.body.status==1){
          alert(data.body.message)
        }else{
          alert(data.body.message)
          this.showRePassword=true
          this.showUserInfo=false
          console.log(this.showRePassword)
        }
      })
    },
      changeUserPassword:function (event) {
        this.$http.post(serverSrc.src + '/users/findPassword',{username: this.username,userMail:this.userMail,userPhone:this.userPhone,repassword:this.repassword}).then((data) => {
          if(data.body.status==1){
            alert(data.body.message)
          }else{
            alert(data.body.message)
            this.$router.go(-1)
          }
        })
      },
  }

  }
</script>
<style>
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
