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

          <div class="defshake main">
            <img src="@/assets/images/defshoucang.png" alt="" v-if="!itDate.Shared"
                 title="添加快捷方式"
                 @click="addShared"
            >
            <img src="@/assets/images/shanchukuaijiefangshiwujiaoxing.png" alt=""
                 v-if="itDate.Shared"
                 title="移出快捷方式"
                 @click="delShared"
            >
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
      <div class="editCount">
        <div class="root">
          <div class="editTitle">
            <!--<input type="text" value="2018-02-08 dom可视区操作" class="editValue">-->
            <input type="text" v-model="editValue" class="editValue">
          </div>
          <div class="textArea">
                  <!--bug  自身内容超过高度,自身产生滚动条-->
                  <!--内容被手动修改应该同步vuex数据-->
            <textarea v-model="editTextarea"></textarea>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
             routeId:'',  //要根据这个id来过滤数据显示content中的内容
             itDate:{},  // 保存要展示content内容的对象
             editValue:'', // 双向数据绑定的Value值  只要在原文上修改之后,切换路由,就同步vuex中的数据
             editTextarea:'',  // 双向绑定textarea中的数据 ?
             tranTitle:'',  // 保存用户实时输入的标题信息
             tranTextarea:'', // 保存用户实时输入的内容信息
             tranId:'', //记录修改的内容id
          }
        },
        methods:{
            //实时获取route路由信息对象
            hasRouteId(){
                let userId = this.$route.params.userId;
                if(userId){
                  this.routeId = userId;
                }
            },

          // 添加快捷方式
          addShared(){
              this.$store.commit('collec',this.itDate)
          },
          //移除快捷方式
          delShared(){
              this.$store.commit('delcollec',this.itDate)
          }

        },

      // 生命周期钩子函数
        created(){
           this.hasRouteId();
        },
       watch:{
          // 监听路由信息对象变化
          $route(){
            this.hasRouteId();

            // // 接下来要根据id 过滤不同的数据 显示在noteInfo组件中
            this.itDate = this.$store.getters.getNoteinfo(this.routeId)[0];
            this.editValue = this.itDate.title;
            this.editTextarea = this.itDate.content;

            // 在这里将修改的内容提交vuex 修改数据
            // 第一次 this.tranTitle内容为空,是不能提交的
            // this.routeId 是实时的
            // 如果不输入标题,默认为无标题内容
            if(this.tranTitle === ''){
                this.tranTitle = '无标题内容'
            }
            if(this.tranTitle || this.tranTextarea){

              this.$store.commit('changeTitle',{
                id:this.tranId,
                title:this.tranTitle,
                textarea:this.tranTextarea,
              })
            }

          },
        // 监听 标题信息
        editValue(){
          this.tranTitle = this.editValue;
          this.tranId = this.$route.params.userId;
        },

        // 监听 textarea用户的修改
         editTextarea(){
           this.tranTextarea = this.editTextarea;
        }
      }
    }
</script>

<style scoped>

</style>
