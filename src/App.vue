<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0;
  border:0;

  margin:auto;
  width: 1378px;
}
body{
  background-color: #C92424;
  background-image: url('./assets/bg.png');
  background-repeat: repeat;
}

</style>
