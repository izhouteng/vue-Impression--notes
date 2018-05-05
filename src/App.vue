<template>
  <div id="app" v-cloak>
    <!--大容器-->
    <div class="content clearfix">
      <my-nav></my-nav>
      <div class="youbian clearfix">
        <list></list>
        <my-content></my-content>
      </div>
    </div>
  </div>
</template>

<script>

  import nav from './components/nav'
  import list from './components/list'
  import content from './components/content'

  import {clientAuto} from './assets/js/client'

export default {
  name: 'App',
  components: {
      'my-nav':nav,
       list:list,
       'my-content':content,
  },
  // 测试请求数据接口
  created(){
   this.https.noteList().then(({data}) => {
      console.log(data)
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
