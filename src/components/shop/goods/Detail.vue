<template>
    <div>
        <!-- 商品详情	        导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name: 'list'}">首页</router-link>&gt;
                <router-link to="">商品详情</router-link>
            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-370">
                        <div class="goods-box clearfix">
                            <!--商品图片 利用JQ插件来做放大镜-->
                            <!-- 商品放大镜 -->
                            <div class="pic-box">

                                <div class="magnifier" id="magnifier1">

                                    <div class="magnifier-container">

                                        <div class="images-cover"></div>

                                        <!--当前图片显示容器-->

                                        <div class="move-view"></div>

                                        <!--跟随鼠标移动的盒子-->
                                    </div>

                                    <div class="magnifier-assembly">

                                        <div class="magnifier-btn">

                                            <span class="magnifier-btn-left">&lt;</span>

                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>

                                        <!--按钮组-->

                                        <div class="magnifier-line">

                                            <ul class="clearfix animation03">

                                                <li v-for="item in top.imglist" :key="item.id">

                                                    <div class="small-img">
                                                        <img :src="item.original_path" /> </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <!--缩略图-->
                                    </div>

                                    <div class="magnifier-view"></div>

                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/商品图片-->

                    <!--商品信息-->
                    <div class="goods-spec">
                        <h1>{{ top.goodsinfo.title }}</h1>
                        <p class="subtitle">{{ top.goodsinfo.sub_title }}</p>
                        <div class="spec-box">
                            <dl>
                                <dt>货号</dt>
                                <dd id="commodityGoodsNo">{{ top.goodsinfo.goods_no }}</dd>
                            </dl>
                            <dl>
                                <dt>市场价</dt>
                                <dd>
                                    <s id="commodityMarketPrice">¥{{ top.goodsinfo.market_price }}</s>
                                </dd>
                            </dl>
                            <dl>
                                <dt>销售价</dt>
                                <dd>
                                    <em class="price" id="commoditySellPrice">¥{{ top.goodsinfo.sell_price }}</em>
                                </dd>
                            </dl>
                        </div>

                        <div class="spec-box">
                            <dl>
                                <dt>购买数量</dt>
                                <dd>
                                    <!-- element-ui 数字框 -->
                                    <div class="stock-box">
                                        <el-input-number size="mini" v-model="num" :min="0" :max="top.goodsinfo.stock_quantity"></el-input-number>
                                    </div>
                                    <span class="stock-txt">
                                        库存
                                        <em id="commodityStockNum">{{ top.goodsinfo.stock_quantity }}</em>件
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dd>
                                    <div class="btn-buy" id="buyButton">
                                        <button class="buy">立即购买</button>
                                        <button class="add" @click="addCart">加入购物车</button>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <!--/商品信息-->
                    <div class="left">
                        <!-- 侧边栏 - 推荐商品列表, 抽取为公共组件 -->
                        <app-aside :list="top.hotgoodslist"></app-aside>
                    </div>
                </div>
                <div id="goodsTabs" class="goods-tab bg-wrap">
                    <!-- element-ui tab栏 -->
                    <el-tabs type="border-card">
                        <el-tab-pane label="商品介绍">
                            <div v-html="top.goodsinfo.content"></div>
                        </el-tab-pane>
                        <el-tab-pane label="商品评论">
                            <!-- 评论 - 抽取为公共组件 -->
                            <comment :id="id"></comment>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <!--/页面左边-->

        </div>
    </div>

</template>	 
	 
<script>
//引入插件js文件和css文件;
import AppAside from "../subcom/CommonAside.vue";
import Comment from "../subcom/CommonComment.vue";
import "@/assets/lib/imgZoom/js/magnifier.js";
import "@/assets/lib/imgZoom/css/magnifier.css";
import $ from "jquery";

export default {
  components: {
    AppAside,
    Comment
  },

  data() {
    return {
      id: this.$route.params.id,
      num: 1,
      top: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
      //加入购物车
      addCart(){
          //调用vuex里定义的公共的方法;
          //因为如果是同一件商品,前后选择数量,后面的会覆盖前面的,所以要累加;
          let newnum = this.num + (this.$store.state.cart[this.id] || 0);
          this.$store.commit('modify',{id:this.id,num:newnum});
          this.num=1;//加载完之后重置该页面的数字框;
      },
    // 根据当前id获取数据
    getTop() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    }
  },
  created() {
    this.getTop();
  },
  // 商品详情页面的右侧列表, 可以点击切换不同的商品进行预览
  // 但是默认情况下当前页面切换到当前页面不会触发组件的重新渲染, 为了解决这个问题,
  // 我们可以监听$route对象的变化, 因为切换商品后, $route.params.id变化了, 我们监听它,
  // 然后主动发起http请求, 调用接口获取新id的数据进行视图刷新
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getTop();
    },
    top() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };

      // 调用这个插件的方法, 必须保证放大镜相关的DOM节点都已经正常构建并渲染,
      // 但是我们的节点里面有个v-for动态生成列表, 调用该方法时不能保证列表已经构建完毕, 所以延时一下
      setTimeout(function() {
        var _magnifier = $().imgzoon(magnifierConfig);
      }, 500);
    }
  },
  mounted() {}
};
</script>
 	 
 <style scoped>
    .goods-box{
        width: 370px;
        position: relative;
    }
    .left{
        float: right;
        position: relative;
        top:-800px;
    }
    .left-370{
        width: 370px;
    }
    .goods-spec{
        top:-500px;
    }
    #goodsTabs{
        position: relative;
        top:-100px;
    }
</style>

