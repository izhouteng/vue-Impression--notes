<template>
    <div class="notFound" v-show="!$store.state.Not404">
      <div class="count">
        <img src="@/assets/images/drawers_empty_state_search_icon.png" alt="">
        <p class="tip">未找到"{{$store.state.searchValue}}"笔记。</p>
      </div>
    </div>
</template>

<script>
    // 没有搜索到提示组件
    export default {
        name: "notsearch"
    }
</script>

<style scoped>

</style>
