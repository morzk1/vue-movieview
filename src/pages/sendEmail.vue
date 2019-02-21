<template >
<!--此页面需要-->
  <div class="container">
    <div>
        <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
<!--用户的相关信息-->
    <Tabs value="received">
        <TabPane label="收件箱" name="received">
          <Card>
              <div>
                  <email-list v-for="item in receive_items" :title="item.title" :fromUser="item.fromUserName" :context="item.context"></email-list>
              </div>
          </Card>
        </TabPane>
        <TabPane label="发件箱" name="sent">
          <Card>
              <div>
                  <email-list v-for="item in send_items" :title="item.title" :fromUser="item.fromUserName" :context="item.context"></email-list>
              </div>
          </Card>
        </TabPane>
        <TabPane label="发送邮件" name="sendMail">
          <send-talk-box ></send-talk-box>
        </TabPane>
    </Tabs>
    <div style="flex:1;"></div>
  
    <common-footer></common-footer>  <!--  展示引入的footer组件 -->
  </div>
</template>
<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/commonFooter'
import UserMessage from '../components/UserMessage'
import EmailList from '../components/EmailList.vue'
import SendTalkBox from  '../components/SendTalkBox.vue'
import serverSrc from '../commen/commen.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      receive_items: [],
      send_items:[],
      detail:[],
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
    EmailList,
    SendTalkBox,
  },

//  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created () {
    let userId=localStorage._id
    let send_data={
      token:localStorage.token,
      user_id:localStorage._id,
      receive:0
    }
    let receive_data={
      token:localStorage.token,
      user_id:localStorage._id,
      receive:1
    }

    if(userId){
      this.$http.post(serverSrc.src + '/users/showEmail',send_data).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
          this.send_items = data.body.data;
        }
      console.log( data.body.data)
      })
      this.$http.post(serverSrc.src + '/users/showEmail',receive_data).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
          this.receive_items = data.body.data;
        }
        console.log( data.body.data)
      })
    }else{
      alert("用户信息错误")
    }
  },
  methods:{

  }
}
</script>

<style lang="css" scoped>
  .box{
    display: inline-flex;
  }
  .container {
    width: 100%;
    margin: 0 auto;

    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }
</style>
