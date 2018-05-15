<template>
      <div class="undo" v-if="$store.state.undoRemin">
        <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
        <div class="complete main">
          撤销
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
    // 这是撤销提醒组件
    export default {
        name: "undo-remin"
    }
</script>

<style scoped>

</style>
