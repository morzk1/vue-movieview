<template >
  <div>

    <div  class="box">
    <div style="width: 30%;padding-top: 10%">
        <label>LOGIN</label>
      <div>
              <i-input type="text" v-model="username" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </i-input>
      </div>
      <div class="box">
                  <i-input type="password" v-model="password" placeholder="密码">
                   <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
       </div>
     </div>
</div>

    <div  class="box">
        <i-button type="primary" v-on:click=userLogin()>登录</i-button>
        <i-button type="ghost" style="margin-left: 10px;color:#808695" v-on:click=userRegister()>注册</i-button>
        <i-button type="text" style="margin-left: 10px" v-on:click=findBackPassword()>忘记密码</i-button>
    </div>
</div>

</template>
<script>
  import serverSrc from '../commen/commen.js'
  export default {
    created(){
    document.title = "登录"
  },
    data(){
      return{
        username:'',
        password:'',
        userAdmin:false,
      }
    },
    methods:{
      userLogin:function (event) {
      this.$http.post(serverSrc.src + '/users/login',{username: this.username,password:this.password}).then((data) => {
        if(data.body.status==1){
          alert(data.body.message)
        }else{
          let save_token={
            token:data.body.data.token,
            username: this.username,
          }
        //  console.log(data.body.data)
          localStorage.setItem('token',data.body.data.token);
          if(data.body.data.user[0].userAdmin){
            localStorage.setItem('userAdmin',1);
          }else {
            localStorage.setItem('userAdmin','');
          }
          
          localStorage.setItem('username',data.body.data.user[0].username);
          localStorage.setItem('_id',data.body.data.user[0]._id);
//          localStorage.setItem('username',this.username);
          this.$router.go(-1)
        }
      })
    },
//      注册跳转页面
      userRegister:function (event) {
        this.$router.push({path:'register'})
      },
//      找回密码
      findBackPassword:function (event) {
        this.$router.push({path:'findPassword'})
      }
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
