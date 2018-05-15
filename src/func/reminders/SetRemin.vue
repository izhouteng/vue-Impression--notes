<template>
    <div class="reminderAdded" v-if="$store.state.setRemin">
      <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
      <p class="tixingok">提醒已添加</p>
      <div class="notice">
        通知我
      </div>
    </div>
</template>

<script>
  // 设置提醒组件
    export default {
        name: "yx--setremin"
    }
</script>

<style scoped>

</style>
