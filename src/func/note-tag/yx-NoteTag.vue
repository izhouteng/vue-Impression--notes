<template>
      <div class="yx-nt-tag" v-if="false">
        <div class="bijibenInfo">
          <h2>标签</h2>
          <img src="@/assets/images/xinjianbiaoqianya.png" alt="" class="xinjian">
          <div class="message">
            <input type="text" class="messageValue" placeholder="查找标签">
          </div>
        </div>
        <div class="tag-cont">
          <div class="nt-tag">
            <div class="sp-z"></div>
            <div class="tag-page">
              <!--展示标签-->
              <div class="s-tag">
                <span class="z-cont">das</span><span class="t-number">1</span>
                <div class="nt-func">
                  <span class="edittag" title="编辑标签"></span>
                  <span class="deletetag" title="删除标签"></span>
                </div>
              </div>
              <!--编辑标签-->
              <div class="edit-tag">
                <input type="text" value="" class="editVal">
                <div class="saveedit"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
