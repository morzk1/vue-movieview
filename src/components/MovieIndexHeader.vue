<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <router-link to="/">
    <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      主页
    </MenuItem>
    </router-link>
    <router-link to="/movieList">
    <MenuItem name="2">
      <Icon type="ios-people"></Icon>
      电影
    </MenuItem>
    </router-link>
  </Menu>
</template>
<script>
export default {

}
</script>
