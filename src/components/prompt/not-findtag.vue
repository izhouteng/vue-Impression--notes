<template>
  <div class="notFound" v-if="false">
    <div class="count">
      <img src="@/assets/images/drawers_empty_state_search_icon.png" alt="">
      <p class="tip">没有找到含"{{$store.state.tagNoteBookName}}"标签笔记</p>
    </div>
  </div>
</template>

<script>
  // 没有找到的标签组件
  export default {

  }
</script>

<style scoped>

</style>
