<template lang="html">
  <div class="movieList">
    <div>
      <Card style="">
          <router-link :to="{path: '/movieDetail', query:{ id: id }}" >
            <div class="movieInfo">
                <p>
                  <h2>{{movieName}}</h2>
                </p>
                <p>
                <h5>{{movieTimeShow}}</h5>
                </p>
            </div>
            <Divider />
            <p><img :src="movieImg" style="width:150px; height: 225px;"></p>
          </router-link>
      </Card>
    </div>
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
.movieList{
  padding: 5px;
  /* border-bottom: 1px dashed #ababab; */
  margin-bottom: 1px;
}
</style>
