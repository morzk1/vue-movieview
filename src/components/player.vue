<template>
  <!-- <Card style="width:100%;">
      
    <div style="text-align:center">
        <video :src="detail.movieVideo"  controls="controls" width="95%" height="95%"></video>              
    </div>
    <div class="movieInfo" style="display: flex;align-items: center; justify-content: center; flex-direction: column;">
      <div class="buttons" style="display: flex; flex-direction: row; ">
        <Button size="large" icon="ios-download-outline" type="primary" 
               v-on:click=movieDownload()>
              下载次数：{{detail.movieNumDownload}}
        </Button>

        <Button size="large" type="primary"
               v-on:click="support()"
             >点赞:{{detail.movieNumSuppose}}
        </Button>
      </div>
    </div>
</Card> -->
  <div class="mainbox">
    <div class="topbox">
      <div class="left">
        <video :src="detail.movieVideo" controls="controls"></video>
      </div>
      <div class="right">
        <div class="info">
          info
        </div>
      </div>
    </div>
    <div class="udbox">

    </div>
  </div>
</template>

<script>
export default {
  props:['detail'],
  
}
</script>

<style scoped>
  .mainbox{
    width: 1368px;
    background-color: #fff;
  }
  video{
    width: 960px;
    height: 480px;
  }
  .topbox{
    box-sizing: border-box;
  }
  .left,
  .right{
    border: 1px solid black;
    display: inline-block;
  }
  .right{
    height: 480px;
    width: 408px;
  }

</style>