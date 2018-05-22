<template>
    <div class="youbian clearfix" @click="closeTag">

      <!--工作群聊滑窗--------------------------------------------------------------->
      <yxGroup></yxGroup>

      <!--快捷方式滑窗口--------------------------------------------------------------->
      <yxQuickBook></yxQuickBook>

      <!--笔记本滑动窗----------------->
      <yxNotebook></yxNotebook>

      <!--提示组件-->
      <successinfo></successinfo>

      <!--标签组件-->
      <yxNotetags></yxNotetags>


      <!--搜索笔记-------------------------------------------------------------------->
      <div class="searchNote" v-show="$store.state.searchBox">
        <div class="searchChild">
          <input type="text" class="searchValue" placeholder="搜索笔记"
                 v-model="searchValue"
                 @keydown.enter="searchDown"
                 v-focus
          >
          <img src="@/assets/images/qingchusousuoneirong.png" alt=""
               class="clearSearch"
               v-if="searchValue.trim().length"
               @click="clearSearchVal"
          >
          <div class="tishixinxi">
            正在搜索 <span>你的笔记本</span>
          </div>
        </div>
      </div>

      <!-- 笔记列表区域 ------------------------------------------------------->
      <div class="yinxList" @mousedown.prevent="BlurFn" v-show="$store.state.dataListShow">
        <div class="yinxTitle">

          <!--首页显示        如果搜索到笔记就不显示-->
              <div class="cuthide"
                   v-show="!$store.state.searchBox"
                   v-if="!this.$store.state.joinNoteBookObj.title"
              >
                <h2 class="notTitle">笔记</h2>
                <div class="yinxcut">
                  <a href="https://www.yinxiang.com/webclipper/" target="_blank">网页剪藏</a>
                </div>
              </div>

          <!--进入笔记本的时候 显示的笔记本名称-->
          <notebookInfo ref="noteBookinfoScroll"></notebookInfo>
          <div class="tagNames" v-if="$store.state.isJoinNotesTagList">
             标签:{{$store.state.tagNoteBookName}}
          </div>


          <!-- 笔记条数和选项 -->
          <div class="noteNumbers clearfix">
            <div class="yinxnum">{{allNoteList.length}} 条笔记</div>
            <div class="select" @click.stop="selectHander">
              <span>选项</span>
            </div>
            <!--选项列表-->
            <yxSelectSort></yxSelectSort>
          </div>
        </div>

        <!-- 笔记内容列表区域----------------------------------- -->
        <div class="NodesTwoList">
          <div class="nodescroll" id="nodescroll" ref="homeScroll">

            <router-link tag="div" class="n-conts"
                         v-for="(item,index) in allNoteList"
                         :key="item.id"
                         :to="/home/+item.id"
                          @click.native="state=item.id"
                         :class="state == item.id ? 'sel' : ''"
                          v-show="!$store.state.notelistNumber"

            >
              <h2 class="n-title">{{item.title}}</h2>
              <div class="n-times">{{item.createTime}}</div>
              <div class="n-wrap" v-show="$store.state.showTextState">
                {{item.content}}
              </div>

              <!-- 笔记列表 分享 闹钟 收藏 删除 -->
              <div class="n-fnc">
                <div class="n-shake cont-icon" @click.stop="shareHander(item)" title="分享"></div>
                <div class="n-remind cont-icon remins"
                     title="设置提醒" :class="item.remind ? 'active' : ''"
                     @click.stop="remindHander"
                ></div>
                <div class="n-collection cont-icon" :title="!item.shortcut ? '添加快捷方式' : '移除快捷方式'">
                  <img src="@/assets/images/shoucang_white_24x24.png" alt=""
                       v-if="!kJshow && !item.shortcut"
                       @mouseover="kJoverHander"
                  >
                  <img src="@/assets/images/shortcuts_solid_white_24x24.png" alt=""
                       v-if="kJshow || item.shortcut"
                       @mouseout="kJoutHander"
                       @click.stop="addkJHander(item)"
                  >
                </div>
                <div class="n-delete cont-icon" id="delicom" title="删除笔记" @click.stop="delNoteHandel(item)"></div>
                <!--设置提醒组件-->
              </div>
              <div class="n-bot"></div>
              <!--选项组件-->
            </router-link>

            <!--未找到搜索的笔记  动态计算高度----------------->
            <notsearch></notsearch>
            <my-tip></my-tip>
            <!--未找到标签笔记-->
            <notFindtag></notFindtag>
          </div>
        </div>
      </div>


      <!--最右侧笔记本内容信息区域-------------------------------->
      <!--左侧区域-->
      <!--:style=""-->
      <!--$store.state.quickShow-->
      <!--:style="this.$store.state.yinListopation?'opacity:0.2':''"-->
      <!--notWidth  添加class -->
      <div class="yinxDet clearfix" id="yinxdet"
           v-show="$store.state.Not404"
           :class="$store.state.yinxdetWidth ? 'notWidth' : ''"
      >
        <!--透明度遮罩层-->
        <div class="opationWindow" v-show="$store.state.yinListopation" @click="closeOpationsHander"></div>
        <!--标题功能栏-->
        <div class="dethead" @mousedown.prevent>
          <div class="detfunc">
            <!--active-->
            <div class="deftimes main"
                 title="设置提醒"
                 @click.stop="remindHander"
                 :class="noteContent.remind && !noteContent.completeState ? 'active' : ''"
            >
              <!--提醒已添加 通知我弹窗-->
              <setremin></setremin>

              <!--修改弹窗提醒-->
              <changeremin></changeremin>

              <!--撤销 修改提醒 清除日期-->
              <undoremin></undoremin>

              <!--<setdate :open="open"></setdate>-->
              <showtimes></showtimes>

            </div>
            <div class="tixingshijian" :class="noteContent.completeState ? 'wancheng' : ''">
                {{noteContent.remindTime}}
            </div>

            <div class="defshake main" :title="!noteContent.shortcut ? '添加快捷方式' : '移除快捷方式'">
              <img src="@/assets/images/defshoucang.png" alt=""
                   v-if="!noteContent.shortcut && !tkJshow"
                   @mouseover="tkJoverHander"
              >
              <img src="@/assets/images/shanchukuaijiefangshiwujiaoxing.png" alt=""
                   v-if="noteContent.shortcut || tkJshow"
                   @mouseout="tkJoutHander"
                   @click.stop="addkJHander(noteContent)"
              >
            </div>
            <div class="definfo main bj-n" title="笔记信息" @click="infoHander"></div>
            <div class="defdelete main" title="删除笔记" @click.stop="delNoteHandel(noteContent)"></div>
            <!--复制笔记链接-->
            <div class="defmore main" title="更多" @click.stop="moreHander">
              <div class="copynoteUrl" v-if="$store.state.copyurlNotes">
                <div class="copytxt" title="复制笔记链接">
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
            <div class="defshared clearfix mains" @click="messageHander">
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
            <div class="defscreen mains" title="展开"
                 v-show="!$store.state.unfoldShow"
                 @click="openHander"
            ></div>
            <!--写笔记完成-->
            <div class="writeNotesOk"
                 v-if="$store.state.unfoldShow"
                 @click="closeHander"
            >
              完成
            </div>
            <yxGroupMessage :state="messageState" :data="noteContent" @close-hander="closeHanderMessage">
              <div class="topJiant" slot="tagget"></div>
            </yxGroupMessage>
          </div>
        </div>

        <!--具体操作交互栏-->
        <div class="stages">
          <!--移动笔记和标签-->
          <div class="liangge" @mousedown.prevent>
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
              <img src="@/assets/images/dijijieduanbiji.png" alt="" class="tubiao" title="移动笔记" @mousedown.prevent>
              <div class="notecont" title="移动笔记" @click.stop="clickMove" @mousedown.prevent>
                {{noteBookTitle.title}}
              </div>
              <div class="qianwangBJB" title="前往笔记本" @mousedown.prevent>
                 <img src="@/assets/images/qianwangbijiben.png" alt="" @click="qWnoteBooks">
              </div>

              <!--移动笔记本 可查找-->
              <div class="yidongBJB" v-show="moveNote" @click.stop>
                <div class="findnotes">
                  <input type="text" class="findValue" placeholder="查找笔记本" v-model="findNotes" ref="findval">
                </div>
                <div class="chuanjian" @mousedown.prevent @click="createNoteBook">
                  <div class="chuangjianIco"></div>
                  <span @mousedown.prevent>创建新笔记本</span>
                </div>
                <div class="mynotesbook"
                     v-for="(item,index) in filterNoteBooks"
                     :key="index"
                     :class="item.id === Pid ? 'active' : ''"
                     @click="moveByNotes(item,item.id)"
                     @mousedown.prevent
                >
                  {{item.title}}
                </div>

              </div>

            </div>

            <!--新建标签-->
            <div class="addtag">
              <!--@mousedown.prevent-->
              <div class="tianjiaBQ">
                <Tag v-for="(item,index) in count" :key="item" :name="item" closable @on-close="handleClose2(item,index)">{{item}}</Tag>
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd" v-show="!editTagShow">添加标签</Button>
                <input type="text" class="tagValue"
                       v-show="editTagShow"
                       ref="tagValue"
                       v-model="tagVal"
                       :style="tagWidth"
                       @blur="BlurFn"
                       @keydown.enter="enterFn"
                >
              </div>
            </div>
          </div>
        </div>

        <!--/***********/-->
        <div class="editCount" ref="editScroll" @click="closeQuick">

          <div class="root">
            <div class="editTitle">
              <input type="text" v-model="titleValue" class="editValue">
            </div>
            <div class="textArea">
                <textarea v-model="textareaValue"></textarea>
            </div>
          </div>

        </div>

        <!--遮罩层-->
        <div class="noteList" v-show="$store.state.notelistNumber">

        </div>

      </div>
    </div>
</template>

<script>

    import {clientAuto} from '@/assets/js/client'
    import {Tag,Button } from 'iview'
    import yxGroup from '@/func/group/yx-Group'
    import yxQuickBook from '@/func/quick/yx-QuickBook'
    import yxNotebook from '@/func/notebook/yx-NoteBook'
    import notebookInfo from '@/components/prompt/notebookInfo'
    import notsearch from '@/components/prompt/Notsearch'
    import myTip from '@/components/prompt/tip'
    import yxSelectSort from '@/func/select/yx-SelectSort'
    import successinfo from '@/components/prompt/successInfo'
    import yxNotetags from '@/func/note-tag/yx-NoteTag'
    import notFindtag from '@/components/prompt/not-findtag'
    let dayjs = require('dayjs');
    dayjs().format();

    //设置提醒组件
    import setremin from '@/func/reminders/SetRemin'
    import changeremin from '@/func/reminders/changeremin'
    import undoremin from '@/func/reminders/UndoRemin'
    import showtimes from '@/func/reminders/showTimes'
    import { DatePicker } from 'iview'
    import yxGroupMessage from '@/func/group/message/yx-group-message'

    export default {
        name: "home",
        components:{
          Tag,
          Button,
          yxQuickBook,
          yxNotebook,
          notebookInfo,
          notsearch,
          'my-tip':myTip,
          yxSelectSort,
          successinfo,
          setremin,
          changeremin,
          undoremin,
          DatePicker,
          showtimes,
          yxNotetags,
          notFindtag,
          yxGroup,
          yxGroupMessage,
        },
        data(){
           return {
              allNoteBook:[], //全部的第几阶段笔记本
              noteBookTitle:{}, // 显示的第几阶段笔记(单个)
              allNoteList:[], //全部的笔记
              noteContent:{}, // title 和 textarea展示内容的对象  也是Home组件消息弹窗的数据
              titleValue:'',  //标题
              textareaValue:'', //内容
              EditTitle:'',     //修改后的标题
              EditTextarea:'', //修改后的内容
              EditId:'', //编辑的Id
              state:1,
              Pid:'', // noteContent对象的pid
              moveNote:false, //移动笔记本显隐

              findNotes:'', //查找笔记本

              // iView数据
              tagVal:'', //绑定tag输入框数据
              count: [],  //保存标签数据
              editTagShow:false, //自定义标签输入框的显示隐藏

              kJshow:false, //快捷方式显示隐藏
              tkJshow:false, //顶部快捷方式显示隐藏
              sCshow:false,  //删除图标显示和隐藏
              delNextId:1,  //删除对象下一个兄弟的id

              searchValue:'', //搜索关键字
              open:true,
              messageState:false, // 弹窗显隐
           }
        },
       methods:{
         // 同步textarea实时修改,左侧笔记列表实时更新
         synchronous(){
             //切换路由对象的时候 提交更新后的title和textarea内容
             let changeObj = this.allNoteList.filter(item => item.id == this.EditId)[0];

             if(this.EditTitle === ''){
               this.EditTitle = '无标题内容'
             }
             // this.EditTitle === '' || this.EditTextarea === '' &&
             // console.log(this.EditTitle !== changeObj.title && this.EditTextarea !== changeObj.content);
             if(changeObj){
                 if(this.EditId !== '' && (this.EditTitle != changeObj.title || this.EditTextarea != changeObj.content)){
                   // 提交vuex 修改数据
                   this.$store.commit('editChange',{
                     id:this.EditId,
                     title:this.EditTitle,
                     content:this.EditTextarea,
                   })
                 }
             }
         },

          // 当本地数据为null,请求
          getList(){
            this.https.getList().then(({data}) => {
              this.$store.dispatch('success',data);
              localStorage.setItem('yinxiang',JSON.stringify(data));
            }).then(() => {
              // 请求成功之后
              this.allNoteList = this.$store.state.allList;  //全部的笔记
              this.inteContent();
              this.getDateTimes.getDateTimes.call(this,this.allNoteList);
              //关闭loading动画
              this.$store.commit('closeLoadding');
            }).catch((err) => {
               alert('网络延迟,请刷新重试')
            })
          },

           // 同步笔记时间数据


          // 初始化noteContent
          inteContent(){
              // 只需要修改路由对象,会自动更新全部这个组件需要的所有数据
               // 默认滚动条高度0  当可以获取到这个元素的时候再进行重置0
               // QQ浏览器 Error in callback for watcher "$route": "TypeError: editSroll.scrollTo is not a function"
              let editSroll = this.$refs.editScroll;
              let homeScroll = this.$refs.homeScroll; //笔记列表滚动条
              if(editSroll){
                 editSroll.scrollTo(0,0)
              }

              //判断 如果是点击了Home
                if(this.$route.params.id === '11111111' && homeScroll){
                   homeScroll.scrollTo(0,0)
                }

                // 判断搜索关键字是不是和vuex状态管理中的一样
                if(this.searchValue !== this.$store.state.searchValue){
                   this.searchValue = this.$store.state.searchValue;
                }

              //判断笔记列表为不为空 并且vuex中控制提示的显示的为空 不为false的时候,再更新vuex中的状态
              if(this.allNoteList.length > 0 && this.$store.state.notelistNumber){
                 this.$store.commit('showNoteList')
              }

              /*-------路由跳转调用该方法,同步笔记列表最新时间-------*/
              this.sortWay.sortWay.call(this,this.allNoteList);

              let userId = this.$route.params.id || this.allNoteList[0].id;
              let routeState = this.$store.state.allList.some(item => item.id == userId);

              this.state = userId;
              if(userId){
                // 根据路由元对象信息从vuex中获取到要展示的数据
                let n = this.allNoteList.filter(item => item.id == userId)[0];

                if(n){
                  this.noteContent = n;
                  this.titleValue = n.title;
                  this.textareaValue = n.content;
                  this.Pid = n.pid; //单条笔记的pid
                  this.$store.commit('noteconten',this.noteContent); //将当前展示的对象同步到vuex状态中
                }else{
                   // 重定向
                   this.$router.replace({
                      path:'/home'
                   })
                }
              }

              window.document.title = this.noteContent.title;

              // 同步标签 此时this.count和this.noteContent引用的是同一个对象label
              this.count = this.noteContent.label;
              // vuex的数据同步到Home组件

              if(this.$store.state.findNotesList.length > 0){
                   this.allNoteList = this.$store.state.findNotesList;
                   this.$store.commit('deleteNoteState','findlist')
              }
              // 判断vuex状态管理中的 笔记本列表是否有
              else if(this.$store.state.joinNoteList.length > 0){
                   this.allNoteList = this.$store.state.joinNoteList;
                   this.$store.commit('deleteNoteState','joinlist')
              }
              // 进入标签笔记列表,判断vuex状态中的标签列表是否存在
              else if(this.$store.state.tagAllList.length > 0 || this.$store.state.tagNoteBookName.length > 0){
                   this.allNoteList = this.$store.state.tagAllList;
                   this.$store.commit('deleteNoteState','taglist')
              }
              else {
                   //全部的笔记 路由跳转实时同步vuex中的笔记列表
                   this.allNoteList = this.$store.state.allList;
                   this.$store.commit('deleteNoteState','alllist')
              }

              //选项列表数据
              this.sortWay.sortWay.call(this,this.allNoteList);


              this.allNoteBook = this.$store.state.dataList; // 全部的第几阶段笔记

              // 根据Pid过滤不同阶段的笔记
              // 在笔记本列表中过滤出与Pid一样的数据,就是当前显示数据的父亲
              let dJ = this.allNoteBook.filter(item => item.id == this.Pid)[0];
              this.noteBookTitle = dJ;
              // this.findDateList; //搜索笔记列表

              //每次路由更新就调用这个方法,同步textarea和笔记列表数据
              // 这两个待优化
              this.synchronous();
          },

         // 点击 移动笔记
         clickMove(){
            this.moveNote = !this.moveNote;
            let bl = this.$refs.findval;
            this.$nextTick(function(){
               bl.focus()
            })

         },

         // 开始移动 移动到哪个阶段笔记本的id----------
         moveByNotes(noteBook,gId){
            // 向gid的children添加,从pid的children移出
           this.$store.commit('moveNotes',{
              gid:gId,
              pid:this.Pid,
              obj:this.noteContent,
              moveObj:noteBook.title, //移动到的笔记本名称
           });
           this.moveNote = false; //关闭移动下拉框
           this.inteContent();  // 从vuex 获取最新的数据 同步到当前的组件
           // 调用方法
           this.message.message.call(this);
         },

         //关闭某些弹窗
         closeTag(){
            //当第几阶段笔记弹窗为true的时候再执行
            if(this.moveNote){
               this.moveNote = false;
            }
         },


         // iView组件 添加标签点击事件
         handleAdd () {
           this.editTagShow = true;
           let val = this.$refs.tagValue;
           this.$nextTick(function(){
              val.style.width = '26px';
              val.focus();
           })
         },
         handleClose2 (tag,index) {
           // const index = this.count.indexOf(name);
           // this.count.splice(index, 1);
             this.$store.commit('delTaglabel',{
                obj:this.noteContent,
                tag:tag,
                index:index,
             })
         },

         // 失去焦点
         BlurFn(){
            //保存数据 提交mutations 修改当前对象的标签
            let isHsh = this.noteContent.label.some(el => el === this.tagVal);  //判断标签有没有重复的
            if(this.tagVal.length && !isHsh){
               this.$store.commit('saveLabel',{
                  obj:this.noteContent,
                  label:this.tagVal
               })
            }

            this.editTagShow = false;
            this.tagVal = '';
         },
          // 键盘Enter事件保存标签
         enterFn(){
            this.BlurFn();
         },

         // 快捷鼠标移入移出, 鼠标移入
         kJoverHander(){
            this.kJshow = true;
         },
         tkJoverHander(){
             this.tkJshow = true;
         },
         //鼠标移开
         kJoutHander(){
            this.kJshow = false;
         },
         tkJoutHander(){
            this.tkJshow = false;
         },
         //添加快捷方式
         addkJHander(item){
            this.$store.commit('addkJHander',{
               obj:item,
            })
         },

         // 删除笔记点击事件
         delNoteHandel(obj){
           if(obj.id === 123456) return;
            //保存当前删除对象的下一个兄弟对象id
           // 问题: 删除完笔记列表,新建一个笔记再次删除会报错id问题
            this.allNoteList.forEach((item,i) => {
                if(item === obj && this.allNoteList.length > 1){
                    if(this.allNoteList[i+1]){
                       // 如果下个兄弟存在
                      this.delNextId = this.allNoteList[i+1].id;
                    }
                    else if(this.allNoteList[i-1]){
                      this.delNextId = this.allNoteList[i-1].id;
                    }
                    // 新建笔记 待添加 标签 收藏 以及及时删除------------------------
                  }
                  else if(this.allNoteList.length === 1){
                      this.delNextId = '';
                  }
            });
            /*----------------------------------------------------*/
            // 在Home组件中的删除功能,点击删除传入当前显示的对象,应该判断它pid的chilren的长度来决定第几阶段的笔记删除完了
            // 不能只考虑笔记列表中的删除功能
            this.allNoteBook.forEach(el => {
                if(el.id == obj.pid){
                   if(el.children.length < 1){
                      this.$store.commit('deleteAll')
                   }
                }
            });

            this.$store.commit('delClickHander',{
               obj:obj,
               id:this.delNextId,
            });
         },

         // searchDown  搜索笔记本列表
         // 从vuex中的笔记列表中过滤,同步到当前组件
         searchDown(){
           //将搜索的关键字同步到vuex
           this.$store.commit('searchHander',{
              text:this.searchValue,
           });
           let arr = this.$store.state.allList.filter(item => {
              return item.title.match(this.$store.state.searchValue) || item.content.match(this.$store.state.searchValue)
           });
           this.allNoteList = arr;
           // this.searchDate = arr;   //保存过滤后的数组  //将搜索到的列表集合同步到vuex中
           this.$store.commit('savefilterNote',{
              obj:arr,
           });
           //判断搜索笔记有没有 -> 如果没有搜索到笔记
           if(arr.length < 1){
               // this.Not404 = false;  //路由跳转到allList的第一个id
               this.$store.commit('isNot404False');
               let n = this.$store.state.allList;
           }else if(arr.length >= 1){
               //搜索到了笔记
                this.$store.commit('isNot404Yes');
                this.$router.push({
                  path:'/home/'+arr[0].id
                })
           }
         },
         // 清空搜索关键字
         clearSearchVal(){
            this.searchValue = '';
         },

         //笔记本展开
         openHander(){
            this.$store.commit('openHander'); //显示完成按钮
            this.$store.commit('searchNone'); //搜索框隐藏
            this.$store.commit('noteListshow'); //隐藏Home组件笔记本列表
            this.$store.commit('yinLeftHander'); //margin-left 设置为0
         },
         // 笔记本收起 完成
         closeHander(){
            this.$store.commit('closeHander'); //显示展开图标
            this.$store.commit('noteListTrue'); //margin-left为原始值,笔记本列表显示
            this.synchronous(); //点击完成也同步左右两边的数据

         },

         //点击内容,隐藏快捷栏
         closeQuick(){
             this.$store.commit('closeQuickbox')
         },

         //前往笔记本
         qWnoteBooks(){
            this.$store.commit('noteListTrue');
            this.$store.commit('closeHander');
            this.$store.commit('QWNOTEBOOK',{
               obj:this.noteBookTitle
            });
            // 前往笔记本,同步笔记列表的时间
            this.getDateTimes.getDateTimes.call(this,this.allNoteList);
            if(this.$store.state.joinNoteList.length >= 1){
               this.$router.push({
                  path:'/home/' + Math.random()
               })
            }
         },

         // 新建笔记
         createNoteBook(){
            this.$store.commit('createHanderShow');
            this.moveNote = false;
         },

         //infoMation组件显示的笔记信息对象
         infoHander(){
            this.$store.commit('infoHander',{
               obj:this.noteContent,
            })
         },

         // 选项列表功能
         selectHander(){
            this.$store.commit('selectShowHander')
         },

         // 点击设置提醒 给当前对象设置
         remindHander(){
           this.$store.commit('closeSelectHander'); //设置提醒和选项菜单都阻止了冒泡,应该手动关闭
            // 如果当前对象没有设置提醒,就设置
            if(!this.noteContent.remind){
                this.$store.commit('setRemin',{
                  obj:this.noteContent,
                })
            }else{
              // 如果已经设置了提醒,判断有没有已经设置时间
              //并且未标记完成状态状态下进行展示
              if(!this.noteContent.completeState){
                 this.$store.commit('changeReminComputed'); //
              }else{
                // 已标记完成,标记完成功能组件
                this.$store.commit('UndoReminHander');
              }

            }
         },

         // 更多 复制笔记链接
         moreHander(){
           this.$store.commit('moreHander')
         },

         //关闭遮罩层
         closeOpationsHander(){
            this.$store.commit('closeQuickbox');
            // 判断vuex状态中的标签列表是否为空,如果不为空就清空
            if(this.$store.state.tagAllList.length > 0){
                this.$store.commit('clearTagList')
            }
         },
         //分享
         shareHander(obj){
            this.$store.commit('showShakeMessage',{
               obj:obj,
            })
         },

         // Home组件的消息弹窗
         messageHander(){
            this.messageState = true;
            // 如果App组件弹窗显示,会关闭
            this.$store.commit('closeMessageHander')
         },
         // 关闭弹窗
         closeHanderMessage(){
            this.messageState = false;
         }
       },


        // 计算属性
        computed:{

           //搜索笔记
           filterNoteBooks(){
               return this.allNoteBook.filter(item => {
                  return item.title.trim().match(this.findNotes)
               })
           },
          //tag输入框的动态宽度计算
          tagWidth(){
           return {
              width:this.tagVal.length * 12 + 26 + 'px'
           }
          },
          // 当前展示对象的时间长度
          noteReminLen(){

          }
        },

        // 钩子函数 请求数据同步vuex
        created(){
            let Storage = JSON.parse(localStorage.getItem('yinxiang'));
            if(Storage === null){
                this.getList();
            }else{
                // 从locaLStorage中取数据
                this.$store.dispatch('success',{data:Storage});
                this.allNoteList = this.$store.state.allList;
                let id = this.$route.params.id;

                //防止胡乱修改路由动态id
                let n = this.allNoteList.some(item => item.id == id);
                if(n){
                  this.inteContent();
                }else{
                  this.$router.push({
                    path:'/home/123456'
                  })
                }
                this.$store.commit('closeLoadding'); //关闭加载loading
                // this.getDateTimes(); //localStorage中获取之后同步时间
                this.getDateTimes.getDateTimes.call(this,this.allNoteList)
            }

        },
        mounted(){
           clientAuto();
        },
       // 侦听路由对象变化
       watch:{
          $route(){
            this.inteContent();
            this.moveNote = false;
          },
         // 监听标题信息
         titleValue(){
            this.EditTitle = this.titleValue;
            this.EditId = this.$route.params.id || this.allNoteList[0].id.toString(); // 字符串类型的id
         },
         // 监听textarea内容
         textareaValue(){
             this.EditTextarea = this.textareaValue;
             this.EditId = this.$route.params.id || this.allNoteList[0].id.toString();
         },

         //监听vuex数据状态
         '$store.state.dataList':{
            handler(){
                localStorage.setItem('yinxiang',JSON.stringify(this.$store.state.dataList));
            },
           deep:true,
         },
         '$store.state.notelistNumber':{
           handler(){
             // 如果为false,说明当前笔记本列表为空,那么判断当前组件的allNoteList为不为空,如果不为空,则清空
             if(this.$store.state.notelistNumber){
                 this.allNoteList = [];
             }
           },
           deep:true,
         },
       },
        directives:{
           focus:{
             inserted:function(el){
               el.focus();
             }
           }
        }

    }
</script>

<style>

  .notWidth {
    margin-left: 0px;
  }
  .noteList {
     background: rgb(248,248,248);
     position: absolute;
     left: 0;
     top: 0;
     z-index: 800;
     width: 100%;
     height: 100%;
  }
  .bj-n {
     width: 24px;
     height: 24px;
     background: url("../assets/images/defbijixinxipng.png") no-repeat;
  }
  .bj-n:hover {
    background: url("../assets/images/bijixinxihover.png") no-repeat;
  }
  .upgrade .g-message {
    left: -290px;
    top: 38px;
  }
</style>
