<template>
  <div id="app" v-cloak>
    <!--大容器-->
    <div class="content clearfix">
      <my-nav></my-nav>
      <div class="youbian clearfix">
        <list></list>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

  import nav from './components/nav'
  import list from './components/list'

  import {clientAuto} from './assets/js/client'

export default {
  name: 'App',
  components: {
      'my-nav':nav,
       list:list,
  },
  // 测试请求数据接口
  created(){
   this.https.noteList().then(({data}) => {
      this.$store.dispatch('requestSuccess',data)
   })
  },
  mounted(){
    clientAuto()
  }
}
</script>
<style>
  [v-cloak]{
    display: none;
  }
</style>
