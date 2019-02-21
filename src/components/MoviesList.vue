<template>
  <div class="card">
    <router-link :to="{path: '/movieDetail', query:{ id: id }}" >
      <div class="top">
        <img :src="movieImg">
      </div>
      <div class="bottom">
        <p class="name">{{movieName}}</p>
        <p class="time">{{ movieTimeShow }}</p>
      </div>
      <!-- <div class="movieInfo">
        <p>
          <h2>{{movieName}}</h2>
        </p>
        <p>
          <h5>{{movieTimeShow}}</h5>
        </p>
      </div>
      <Divider />
      <p><img :src="movieImg" style="width:150px; height: 225px;"></p> -->
    </router-link>
  </div>
</template>
<script>
  import serverSrc from '../commen/commen.js'
  export default {
    data () {
      return{
        movieTimeShow:''
      }
    },
    props: ['id','movieName', 'movieTime', 'movieImg'],   /*  props是子组件获取父组件数据用的 */
    created(){
      this.movieTimeShow=new Date(parseInt(this.movieTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
  }
</script>
<style lang="css" scoped>

.card{
  width: 229.6px;
  height: 400px;
  float: left;
  /* border: 1px solid black; */

  /* padding: 10px calc(28px - .2px) 0 calc(28px - .2px); */
  padding: 10px;
  box-sizing: border-box;
}
.top > img{
  width: 100%;
  height: 320px;
}
.name{
  color: #000;
  font-size: 25px;
  text-align: left;
  line-height: 25px;
}
.time{
  color: #9C9C9C;
  font-size: 10px;
  text-align: left;
  line-height: 14px;
}
</style>
