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
        <div class="editCount">

          <div class="root">
            <div class="editTitle">
              <input type="text" value="2018-02-08 dom可视区操作" class="editValue">
            </div>
            <div class="textArea">
              <textarea>
                知识点: offsetPatent, offsetWidht,offsetHeight,clinetWidth,clinetHeight,offsetTop,offsetLeft, document.documentElement.clinetWidth/Height

    elem.offsetParent: 获取距离当前元素最近的有定位属性的父级
    elem.offsetLeft/offsetTop: 当前元﻿﻿素距离有定位属性的父级元素的距离，不管自身有没有定位

    elem.clientWidth/elem.clientHeight : 获取元素自身的宽高，不包括边框，包括边框以内，包括padding的距离
    elem.offsetWidth/offsetHeight: 边框 + padding + 元素本身的宽高

    获取页面可视区的宽高
    document.body.clientWidth/clientHeight: 获取的是body的可视区，不包括外面的margin值( 16px )
    document.documentElement(文档).clientWidth/Height : (获取的是html的可视区范围)
    window.innerHeight/Width: 也可以获取页面可视区的宽高

    elem.getBoundingClientReat()  返回的是一个对象，存放着当前元素的位置大小的属性

    获取元素滚动条和设置元素滚动条

    window.pageYOffset  纵向滚动条
    window.pageXOffset 横向滚动条距离
    document.documentElement.scrollTop: 纵向滚动条距离
    document.documentElement.scrollLeft: 横向滚动条距离

    document.body.scrollHeight/document.documentElement.Height /一个是body的滚动条高度，一个是文档的滚动条高度

    document.body.scrollTop:为什么为0
    页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement。
    页面没有DTD，即没指定DOCTYPE时，使用document.body

    window.scroll(x,y)  指定滚动条的距离 (横向,纵向)
    window.scrollTo(x,y)
    window.scrollBy(x,y) 可累加的
                            </textarea>

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
