<template>
      <div class="yx-nt-tag" v-if="$store.state.noteTagState">
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

            <div class="tag-page" v-for="item in tagDate" :key="item.randomId">
              <!--展示标签-->
              <!--<div class="s-tag">-->
                <!--<span class="z-cont">das</span><span class="t-number">1</span>-->
                <!--<div class="nt-func">-->
                  <!--<span class="edittag" title="编辑标签"></span>-->
                  <!--<span class="deletetag" title="删除标签"></span>-->
                <!--</div>-->
              <!--</div>-->
              <router-link tag="div" class="s-tag" :to="/home/+item.id">
                <span class="z-cont">{{item.tag}}</span><span class="t-number">1</span>
                <div class="nt-func">
                  <span class="edittag" title="编辑标签"></span>
                  <span class="deletetag" title="删除标签"></span>
                </div>
              </router-link>
              <!--编辑标签-->
              <div class="edit-tag">
                <input type="text" value="" class="editVal">
                <div class="saveedit"></div>
              </div>
            </div>

          </div>
        </div>
        {{filterstag}}
      </div>
</template>

<script>
  export default {
      data(){
        return {
           tagDate:{},
        }
      },
    computed:{
        filterstag(){
           let tagArr = [];
           // 从数据中去到标签的id和数据,同步到当前组件的data中
           let bl = this.$store.state.allList;
           bl.forEach(item => {
              if(item.label.length >= 1){
                 item.label.forEach(el => {
                    tagArr.push({
                      id:item.id,
                      tag:el,
                      randomId:Math.random(),
                    })
                 })
              }
           });
          this.tagDate = tagArr;
        }
    }
  }
</script>

<style scoped>

</style>
