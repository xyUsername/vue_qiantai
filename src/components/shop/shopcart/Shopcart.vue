<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name :'login'}">首页</router-link>&gt;
                <router-link to="">购物车</router-link>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <!-- 表头 -->
                                <tr>
                                    <th width="48" align="center">
                                        <el-switch active-color="#13ce66" :value="allSelected" @change="allChange"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch active-color="#13ce66" v-model="item.selected"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{item.sell_price}}
                                    </th>
                                    <th width="104" align="center">
                                        <!-- 这里绑定的是 vuex里的cart的对应数据,所以改它,总数也会变,因为总数就是取的cart里的数据 -->
                                        <el-input-number size="mini" :min="1"
                                         v-model="$store.state.cart[item.id]"></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>￥{{item.sell_price * $store.state.cart[item.id]}}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button size="mini" @click="delid(item.id
                                    )">删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{ totalPrice }}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.go(-1)">继续购物</button>
                            <button class="submit" @click="toSite">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                goodsList:[]
            }
        },
        computed: {
            allSelected(){
                //返回true或者fasle,只要有一个是没被选择,返回false;
                return this.goodsList.every(v=>v.selected);
            },
             // 被选商品总数 => 遍历所有商品, 如果selecred为true, 那么累加该商品的购买数量
            total() {
                let sum = 0;
                //遍历goodsList数组,如果有状态选中的,就加上id对应的数量,
                this.goodsList.forEach(v => v.selected && (sum += this.$store.state.cart[v.id]));
                return sum;
            },

            // 被选商品总价
            totalPrice() {
                let sum = 0;
                //如果有被选中的,计算总数,如果没有,则不计算;
                this.goodsList.forEach(v => v.selected && (sum += this.$store.state.cart[v.id] * v.sell_price));
                return sum;
            }
        },
        methods: {
            //跳转页面
            toSite(){
                //先找到它被选中的项,在用map方法返回它的id;
                let ids = this.goodsList.filter(v=>v.selected).map(v=>v.id);
                this.$router.push({name:'site',params:{ids:ids.join(",")}});
            },
            //删除商品
            delid(id){
                //保留除了被删除id的其他数据;
                this.goodsList = this.goodsList.filter(v => v.id != id);
                //同时还要删除vuex里的数据;
                this.$store.commit('del', id);                           // 调用mutaions方法删除
            },
            //点击总按钮,其他按钮的状态和它的一样;
           allChange(newStatus){
               this.goodsList.forEach(v => v.selected = newStatus);
           },
           getgoodsList(){
               let ids= Object.keys(this.$store.state.cart);
            //    console.log(ids);
                this.$http.get(this.$api.shopcartGoods + ids).then((res)=>{
                    if(res.data.status ==0){
                        // console.log(res.data.message);
                        res.data.message.forEach(v=>v.selected=true);
                        this.goodsList = res.data.message;
                    }
                })
           } 
        },
        created () {
            this.getgoodsList();
        }
    }
</script>

<style>
</style>