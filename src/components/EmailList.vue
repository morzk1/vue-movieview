<template lang="html">
<div class="message">
  <Card>
    <p><h3>{{title}}</h3></p>
    <p>来自:{{fromUser}}</p>
    <Divider />
    <div>
        {{context}}
    </div>
  </Card>

</div>
</template>
<script>
export default {
  props:['title', 'fromUser','context']
}
</script>
<style lang="css" scoped>
  /* .message{
    border: 1px solid;
  } */
</style>
