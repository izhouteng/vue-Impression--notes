<template>
    <div class="youbian_2">
        <!--工作群聊滑窗--------------------------------------------------------------->
        <div class="worktoking">
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

        <!--快捷方式滑窗口--------------------------------------------------------------->
        <div class="quick">
          <div class="q_biaoti">
            <h2>快捷方式</h2>
          </div>
          <!--快捷信息 收藏的列表-->
          <div class="kuaijieInfo">
            <div class="nokuaijie">
              <img src="@/assets/images/kuaijiefangshiwuneirong.png" alt="" class="logo">
              <div class="quickxinxi">
                <p>工作更高效</p>
                <p>移动鼠标至列表中的某个笔记或笔记本,并点击☆创建快捷方式(这个五角星我是真没图片)</p>
              </div>
            </div>

            <!--有收藏列表内容------------------------------->
            <div class="quickList">
              <div class="item clearfix" style="background: #2dbe60">
                <div class="beforeicon"></div>
                <div class="q_t">
                  2018-5-2 jquery extend
                </div>
                <!--移出收藏-->
                <div class="delete" title="删除快捷方式"></div>
              </div>
              <div class="item clearfix">
                <div class="beforeicon"></div>
                <div class="q_t">
                  2018-5-2 jquery extend
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--笔记本滑动窗----------------->
        <div class="bijibenHDC">
          <div class="bijibenInfo">
            <h2>笔记本信息</h2>
            <img src="@/assets/images/huachuangbijiben.png" alt="" class="xinjian" title="创建笔记本">
            <div class="message">
              <input type="text" class="messageValue" placeholder="查找笔记本">
            </div>
          </div>
          <!--笔记本列表-->
          <div class="bijibenList">
            <div class="notList">
              暂无笔记本信息...
            </div>
            <!--笔记本数据列表-->
            <div class="liebiao">
              <div class="list_main">
                <div class="bijixinxi">
                  <div class="noteTitle">
                    JavaScript_第一阶段笔记
                  </div>
                  <p class="number">21 条笔记</p>
                  <img src="@/assets/images/1shanchubiji.png" alt="" class="delnotes" title="删除笔记本">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--标签滑窗开始----------------------------------->



        <!--标签滑窗结束----------------------------------->

        <!--搜索笔记-------------------------------------------------------------------->
        <div class="searchNote">
          <div class="searchChild">
            <input type="text" class="searchValue" placeholder="搜索笔记">
            <img src="@/assets/images/qingchusousuoneirong.png" alt="" class="clearSearch">
            <div class="tishixinxi">
              正在搜索 <span>你的笔记本</span>
            </div>
          </div>
        </div>
        <!-- 笔记列表区域   yinList的显示隐藏 由vuex控制------------------------------------------------------->
        <div class="yinxList" v-if="$store.state.yinxList">
          <div class="yinxTitle">

            <!--首页显示-->
            <div class="cuthide">
              <h2 class="notTitle">笔记</h2>
              <div class="yinxcut">
                <span>网页剪藏</span>
              </div>
            </div>

            <!--进入笔记本的时候 显示的笔记本名称-->
            <div class="noteNames">
              <img src="@/assets/images/dijijieduanbijibenxinxi.png" alt="" class="noteinfoPic">
              <div class="title">
                Javascript_第一阶段笔记
              </div>
            </div>


            <!-- 笔记条数和选项 -->
            <div class="noteNumbers clearfix">
              <div class="yinxnum">{{listdata.length}}条笔记</div>
              <div class="select">
                <span>选项</span>
              </div>
              <!-- 选项列表 -->
              <div class="selList">
                <legend class="sortingWay">排序方式</legend>
                <ul class="sortlist">
                  <li>创建日期(最早优先)</li>
                  <li>创建日期(最新优先)</li>
                  <li style="background: url('@/assets/images/duigou.png') no-repeat 162px 11px;">更新日期(最早优先)</li>
                  <li>创建日期(最新优先)</li>
                  <li>标题(升序排列)</li>
                  <li>标题(降序排列)</li>
                </ul>
                <div class="MenuDivider"></div>
                <div class="viewsel">
                  <legend>查看选项</legend>
                  <div>显示图片</div>
                  <div>显示文字</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 笔记内容列表区域----------------------------------- -->
          <div class="NodesTwoList">
            <div class="nodescroll" id="nodescroll">

              <router-link
                tag="div"
                class="n-conts"
                v-for="(item,index) in listdata"
                :key="item.id"
                :to="/home/+item.id"
                 @click.native="selectNote(index)"
                 :class="{sel:index === state}"
              >
                  <h2 class="n-title">{{item.title}}</h2>
                  <div class="n-times">{{item.createTime}}</div>
                  <div class="n-wrap">
                    {{item.content}}
                  </div>
                  <!-- 笔记列表 分享 闹钟 收藏 删除 -->
                  <div class="n-fnc">
                    <div class="n-shake cont-icon">
                      <img src="@/assets/images/cont_fenxiang1.png" alt="" title="分享">
                    </div>
                    <div class="n-remind cont-icon">
                      <img src="@/assets/images/tixing24x24.png" alt="" title="设置提醒">
                    </div>
                    <div class="n-collection cont-icon">
                      <img src="@/assets/images/shoucang_white_24x24.png" alt=""
                           @click.stop="isCollec(item)"
                           title="添加快捷方式"
                           v-if="!item.Shared"
                      >
                      <img src="@/assets/images/shortcuts_solid_white_24x24.png" alt=""
                           v-if="item.Shared" title="移除快捷方式"
                           @click.stop="delCollec(item)"
                      >
                    </div>
                    <div class="n-delete cont-icon">
                      <img src="@/assets/images/delete_white_24x24.png" alt="" title="删除">
                    </div>
                  </div>

              </router-link>

              <!--未找到搜索的笔记  动态计算高度----------------->
              <div class="notFound">
                <div class="count">
                  <img src="@/assets/images/drawers_empty_state_search_icon.png" alt="">
                  <p class="tip">未找到"好吧"笔记。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
          return {
             listdata:[], //列表数据
             allList:[],  //所有的笔记列表
             state:0,    // 点击那个笔记,state保存这个笔记的状态值
          }
        },
       methods:{
          //需要加上native修饰符
          selectNote(index){
             this.state = index;
          },
          // 添加收藏 boolean
         isCollec(obj){
            this.$store.commit('collec',obj);
         },
         // 移出收藏
         delCollec(obj){
            this.$store.commit('delcollec',obj)
         }
      },

      // 异步获取vuex state中的函数
      created(){
          this.https.noteList().then(() => {
            let list = this.$store.getters.allList;
            this.listdata = list;
            let n = this.listdata[0];
            this.$router.push({
               path:`/home/${n.id}`
            })
          })
      }
    }
</script>

<style scoped>

</style>
