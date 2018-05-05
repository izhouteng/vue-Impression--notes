<template>
      <!--最右侧笔记本内容信息区域-------------------------------->
      <!--左侧区域-->
      <div class="yinxDet clearfix" id="yinxdet">
        <!--标题功能栏-->
        <div class="dethead">
          <div class="detfunc">
            <div class="deftimes main">
              <img src="@/assets/images/defshizhong.png" alt="" title="设置提醒">
              <span class="tixingshijian">18/5/5</span>
              <!--提醒已添加 通知我弹窗-->
              <div class="reminderAdded">
                <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
                <p class="tixingok">提醒已添加</p>
                <div class="notice">
                  通知我
                </div>
              </div>

              <!--修改弹窗提醒-->
              <div class="changeTixing">
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

              <!--撤销 修改提醒 清除日期-->
              <div class="undo">
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

            </div>

            <div class="defshake main" title="添加快捷方式">
              <img src="@/assets/images/defshoucang.png" alt="">
              <img src="@/assets/images/shanchukuaijiefangshiwujiaoxing.png" alt="" style="display: none;">
            </div>
            <div class="definfo main" title="笔记信息">
              <img src="@/assets/images/defbijixinxipng.png" alt="">
              <img src="@/assets/images/bijixinxihover.png" alt="" style="display: none">
            </div>
            <div class="defdelete main" title="删除笔记">
              <img src="@/assets/images/defshanchu.png" alt="">
              <img src="@/assets/images/shanchubiji.png" alt="" style="display: none">
            </div>
            <!--复制笔记链接-->
            <div class="defmore main" title="更多">
              <img src="@/assets/images/defgengduo.png" alt="">
              <img src="@/assets/images/gengduo.png" alt="" style="display: none">
              <div class="copynoteUrl">
                <div class="copytxt">
                  复制笔记链接
                </div>
              </div>
            </div>
          </div>
          <!--升级共享-->
          <div class="upgrade">
            <div class="detup mains">
              升级
            </div>
            <div class="defshared clearfix mains">
              <span class="gongx">共享</span>
              <div class="target"></div>
              <div class="shakeDown">
                <div class="s-notes">
                  共享笔记
                </div>
                <div class="send-email">
                  发送邮件
                </div>
              </div>
            </div>
            <!--展开 全屏-->
            <div class="defscreen mains" title="展开"></div>
            <!--写笔记完成-->
            <div class="writeNotesOk">
              完成
            </div>
          </div>
        </div>

        <!--具体操作交互栏-->
        <div class="stages">

          <!--移动笔记和标签-->
          <div class="liangge">
            <div class="movenotes">
              <img src="@/assets/images/dijijieduanbiji.png" alt="" title="移动笔记本">
              <div class="caonima">
                <img src="@/assets/images/qianwangbijiben.png" alt="" title="前往笔记本">
              </div>
            </div>
            <div class="biaoqian">
              <img src="@/assets/images/xinjianbiaoqian.png" alt="" title="标签">
            </div>
          </div>

          <!--第几阶段笔记-->
          <div class="dijijieduanBJ clearfix">
            <div class="yidong clearfix">
              <img src="@/assets/images/dijijieduanbiji.png" alt="" class="tubiao" title="移动笔记">
              <div class="notecont" title="移动笔记">
                javascript_第二阶段笔记
              </div>
              <div class="qianwangBJB" title="前往笔记本">
                <img src="@/assets/images/qianwangbijiben.png" alt="">
              </div>

              <!--移动笔记本 可查找-->
              <div class="yidongBJB">
                <div class="findnotes">
                  <input type="text" class="findValue" placeholder="查找笔记本">
                </div>
                <div class="chuanjian">
                  <img src="@/assets/images/chuangjianbijiben.png" alt="">
                  <span>创建新笔记本</span>
                </div>
                <div class="mynotesbook">
                  JavaScript_第一阶段笔记
                </div>
                <div class="mynotesbook">
                  JavaScript_第一阶段笔记
                </div>
                <div class="mynotesbook active">
                  JavaScript_第一阶段笔记
                </div>
                <div class="mynotesbook">
                  JavaScript_第一阶段笔记
                </div>
              </div>

            </div>

            <!--新建标签-->
            <div class="addtag">
              <div class="tianjiaBQ">
                添加标签
              </div>
            </div>
          </div>
        </div>

        <!--/***********/-->
        <!--动态路由开始 内容信息展示页-->
        <router-view></router-view>
        <!--动态路由结束-->
      </div>
</template>

<script>
    export default {
        components:{

        }
    }
</script>

<style scoped>

</style>
