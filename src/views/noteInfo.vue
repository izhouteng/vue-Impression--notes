<template>
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
</template>

<script>
    export default {
        data(){
          return {
             routeId:'',  //要根据这个id来过滤数据显示content中的内容
          }
        },
        created(){
           let userId = this.$route.params.id;
           this.routeId = userId
        },
      watch:{
          // 监听路由信息对象变化
          $route(){
            let userId = this.$route.params.id;
            this.routeId = userId

          }
      }
    }
</script>

<style scoped>

</style>
