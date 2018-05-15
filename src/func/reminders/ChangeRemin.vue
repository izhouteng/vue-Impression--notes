<template>
    <div class="changeTixing" v-if="$store.state.changeRemin">
      <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
      <div class="complete main">
        标记完成
      </div>
      <div class="main">
        清除提醒
      </div>
      <div class="main">
        修改日期
      </div>
    </div>
</template>

<script>
   // 这是修改提醒组件
    export default {
        name: "change-remin"
    }
</script>

<style scoped>

</style>
