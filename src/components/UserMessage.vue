<template lang="html">
  <div v-if=!isLogin class="header">
      <Row>
        <i-col span="2" offset="22">
              <router-link to="/loginPage">
                  <div class="header_menu"><Icon type="person"  />登录</div>
              </router-link>
        </i-col>
      </Row>
  </div>

    <div v-else class="header">
      <!-- <Row>
        <i-col span="2"  offset="22">
          <router-link :to="{path: '/userInfo', query:{ id: id }}">
            <div class="header_menu"><Icon type="person" />已登录：{{username}}</div>
          </router-link>
        </i-col>
      </Row> -->
      <!-- <i-col span="2"  offset="42">
          <a @click="logout()">
              <div class="header_menu"><Icon type="ios-log-out" />退出登录</div>
          </a>
      </i-col>
       -->
       <Row type="flex" justify="space-between" class="code-row-bg">
          <Col span="8">
            <router-link :to="{path: '/userInfo', query:{ id: id }}">
              <div class="header_menu"><Icon size="16" type="md-person" />已登录：{{username}}</div>
            </router-link>
          </Col>

          <Col span="8" v-if="userAdmin">
            <router-link :to="{path: '/admin'}">
              <div class="header_menu"><Icon size="16" type="md-construct" />进入控制台</div>
            </router-link>
          </Col>
          <Col span="8">
            <a @click="logout()">
                <div class="header_menu"><Icon size="16" type="md-log-out" />退出登录</div>
            </a>
          </Col>
      </Row>
    </div>
</template>
<!--这里需要一开始对于session进行检测，如果存在session则直接显示登录，不存在则是跳转链接-->
<script>
export default {
  data(){
    return{
      isLogin:false,
      username:'',
      userAdmin:false,
    }
  },
  created(){
//    此时登录成功
    let token=localStorage.getItem('token')
//    console.log(token)
    if(token){
      this.isLogin=true
      this.username=localStorage.getItem('username')
      this.id=localStorage.getItem('_id')
      this.userAdmin=Boolean(localStorage.userAdmin) 
    }else{
        console.log('用户获得登录失败');
//      this.localStorage.setItem(data.body.data);
    }
  },

  methods:{
    logout(event){
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        localStorage.removeItem('userAdmin');
        alert('退出成功!将回到首页!');
        // location.reload();
        if(!this.$router.push({path: '/'})){
          location.reload();
        }
      }
    }
}
</script>
<style lang="css" scoped>
.header{
  width: 100%;
  height: 30px;
  left: 0;
  top: 0;
  color: #000;
  background-color: #c3bbbb;
}
  .header_menu{
    padding-top: 6px;
    color:rgb(49, 49, 49);
    font-size:14px;
    font-weight: bold;
  }
</style>
