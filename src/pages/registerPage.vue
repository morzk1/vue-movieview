<template >
<div>
  <MovieIndexHeader></MovieIndexHeader>
  <UserMessage></UserMessage>
  <div class="regbox">
    <div class="main">
        <div class="box">
            <Input v-model="username" placeholder="用户名">
              <label slot="prepend">账号</label>
            </Input>
          </div>
          <div class="box">
            <Input v-model="password" placeholder="密码" type="password">
            <label slot="prepend">密码</label>
            </Input>
          </div>
          <div class="box">
              <Input v-model="rePassword" placeholder="重复输入密码" type="password">
                <label slot="prepend">密码</label>
              </Input>
          </div>
          <div class="box">
              <Input v-model="userMail" placeholder="邮箱">
                <label slot="prepend">邮箱</label>
              </Input>
          </div>
          <div class="box">
              <Input v-model="userPhone" placeholder="手机">
                <label slot="prepend">手机</label>
              </Input>
          </div>
          <div  class="box">
            <Button v-on:click=userRegister() type="success">注册</Button>
          </div>    
    </div>
  </div>
  <CommonFooter></CommonFooter>
</div>

</template>
<script>
  import MovieIndexHeader from '../components/MovieIndexHeader'
  import CommonFooter from '../components/commonFooter'
  import UserMessage from '../components/UserMessage'
  import serverSrc from '../commen/commen.js'
  
  export default {
    components:{
      MovieIndexHeader,
      CommonFooter,
      UserMessage
    },
    created() {
      document.title = '注册';      
    },
    data(){
      return{
        username:'',
        password:'',
        userMail:'',
        userPhone:'',
        rePassword:'',
      }
    },
    methods:{
//      注册方法

      userRegister:function (event) {
        if(this.password!=this.rePassword){
          alert("两次密码不一致")
        }else{
          let sendDate={
            username: this.username,
            password:this.password,
            userMail:this.userMail,
            userPhone:this.userPhone,
          }
          this.$http.post(serverSrc.src + '/users/register',sendDate).then((data) => {
            if(data.body.status==1){
              alert(data.body.message)
            }else{
              alert(data.body.message)
              this.$router.go(-1)
            }
          })
        }

      },
  }

  }
</script>
<style>
  .regbox{
    /* max-width: 90vh; */
    display: flex;
    flex-flow: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
  }
.main{
  flex:1;
}
  .box{
    /* display: flex;
    justify-content: center;
    align-items: center; */
    padding-top: 10px;
  }
</style>
