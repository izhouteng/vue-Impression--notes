<template>
    <div class="worktoking" v-show="$store.state.shareState">
      <div class="header">
        <h2 class="title">工作群聊</h2>
        <img src="@/assets/images/gongzuoqunliaoyousahngjiaotubiao.png" alt="" class="righttPic" title="开始群聊">
        <div class="message">
          <input type="text" class="messageValue" placeholder="搜索联系人或群聊消息">
        </div>
      </div>
      <div class="workWrap">
        <div class="tishineirong">
          <div class="text">
            <p>开始群聊</p>
            <p>在笔记或笔记本中点击"共享",与任何人共享并讨论。或者点击右上角的群聊图标,立即开始聊天</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "yx--group",
        methods:{

        }
    }
</script>

<style scoped>

</style>
