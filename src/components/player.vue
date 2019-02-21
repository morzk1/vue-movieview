<template>
  <div style="width:100%;">
      
    <div class="videoBox">
        <video :src="detail.movieVideo"  controls="controls" width="95%" height="95%"></video>              
    </div>
</div>
  
</template>

<script>
export default {
  props:['detail'],
  
}
</script>

<style scoped>



</style>