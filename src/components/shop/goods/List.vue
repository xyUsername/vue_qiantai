<template>
    <!-- 商品列表主体部分 -->
    <div>
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'shop'}">首页</router-link> &gt;
                <router-link to="#">购物商城</router-link>
            </div>
        </div>
        <!-- 页面头部 -分类列表和轮播图 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--左边类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in top.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">{{ subitem.title }}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <p href="">{{item.title}}</p>
                                            </dt>
                                            <dd>
                                                <p>
                                                    <span v-for="subitem in item.subcates" :key="subitem.id">{{ subitem.title }}&nbsp;</span>
                                                </p>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片 element-ui 走马灯-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel style="height:100%">
                                <!-- 图片 -->
                                <el-carousel-item v-for="item in top.sliderlist" :key="item.id">
                                    <img :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <!-- 提出来做成公共模板了 -->
                    <app-aside :list="top.toplist"></app-aside>
                    <!--/推荐商品-->

                    
                </div>
            </div>
        </div>

        <!-- 页面主体 商品列表预览,抽取为子组件了 -->
        <list-main></list-main>
    </div>
</template>

<script>
import AppAside from '../subcom/CommonAside.vue'
import listMain from '../subcom/ListMain.vue'
export default {
  data() {
    return {
      top: {
        catelist: [],
        sliderlist: [],
        toplist: []
      }
    };
  },
  components: {
      AppAside,
      listMain
  },
  methods: {
    //获取页面的数据
    getTop() {
      this.$http.get(this.$api.goodsTop).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        //   console.log(this.top.toplist);
        }
      });
    }
  },
  mounted() {
    this.getTop();
  }
};
</script>

<style scoped lang="less">


</style>