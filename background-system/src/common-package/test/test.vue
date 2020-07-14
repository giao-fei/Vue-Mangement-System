<template>
      <div id="app">
        <div id="box">{{msg}}</div> 
      </div>
</template>

<script>
export default {
   name: 'Test',
   data(){
       return {
           msg: 'hello world'
       }
   }
}
</script>

<style lang="less" scoped>
@import './test.less';
</style>