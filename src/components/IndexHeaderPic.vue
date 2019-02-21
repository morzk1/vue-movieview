<template lang="html">
  <div class="headerPic">
    <Carousel v-model="value1" loop autoplay autoplay-speed="5000" style="height: 30vh">
        <CarouselItem v-for="item in headerItems">
            <a :href="item.recommendSrc"><img v-bind:src="item.recommendImg" class="headerImg" style="height: 30vh; width: 100%;"/></a>
        </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
export default {
  // props:['headerItems']
  props:['headerItems'],
  data(){
    return {value1:0}
  }
}
</script>
<style lang="css" scoped>

</style>
