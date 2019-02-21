<template >
  <li class="goods-list">
  <div class="newsList">
    <router-link :to="{path: '/newDetail', query:{ id: id }}" class="goods-list-link">  <!--  这个是用来跳转页面的，可以理解为a标签 -->
      {{articleTitle}}
      {{articleTimeShow}}
    </router-link>
  </div>
  </li>
</template>

<script>
  
export default {
  data () {
    return{
      articleTimeShow:''
    }
  },
  props: ['id','articleTitle', 'articleTime'], /*  props是子组件获取父组件数据用的 */
  created(){
    this.articleTimeShow=new Date(parseInt(this.articleTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
  },
  }

</script>
<style lang="css" scoped>
  .newsList{
    padding: 5px;
    font-size: 1em;
    border-bottom: 1px dashed #ababab;
  }
  li{
    list-style: none;
  }
</style>
