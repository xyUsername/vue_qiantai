<template>
    <div id="header" class="header">
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>许烨的vue2.0项目前端</span>
                </div>
                <div id="menu" class="right-box">
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords"  type="text"  placeholder="请蹂躏我吧!!">
                        </div>
                    </div>
                    <a href="http://localhost:8080/login" class="login">登录</a>
                    <router-link href="" class="regist" :to="{name : 'shopcart'}">购物车({{$store.getters.total}})件</router-link>
                    <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                       <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
                </div>
            </div>
        </div>
        <div class="head-nav">
            <div class="section">
                <!-- <div class="logo">
                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                   </div>-->
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <a href="http://localhost:8080/shop">
                                <span class="out">首页</span>
                                <span class="over">首页</span>
                            </a>
                        </li>
                        <li class="news">
                            <a href="">
                                <span class="out">学员问题汇总</span>
                                <span class="over">学员问题汇总</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="">
                                <span class="out">重难点专区</span>
                                <span class="over">重难点专区</span>
                            </a>
                        </li>
                        <!--<li class="goods"><a href="">就业阶段</a></li>-->
                        <li class="video">
                            <a href="">
                                <span class="out">前端常用功能</span>
                                <span class="over">前端常用功能</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="">
                                <span class="out">资源下载</span>
                                <span class="over">资源下载</span>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="">
                                 <span class="out">问题提交</span>
                                <span class="over">问题提交</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    }
};
$(function () {
    $('.out').on('mouseover',function () {
        $(this).stop().animate({
            "top":"50px"
        },500).siblings().stop().animate({
            "top":"-50px"
        },500)
      })
      $('.nav-box').on('mouseout',function () {
        $(".out").stop().animate({
            "top":"0px"
        },500).siblings().stop().animate({
            "top":"50px"
        },500)
      })
  })
</script>

<style scoped lang="less">
    #header{
        a,span{
            color:red;
            font-size: 16px;
            font-weight: 600;
        }
        width: 100%;
        .head-top{
            width: 100%;
            height: 40px;
            background-color: #000;
            position: relative;
            .section{
                width: 88%;
                height: 100%;
                margin: 0 auto;
                line-height: 40px;
                .left-box{
                    float: left;
                }
                .right-box{
                    float: right;
                    .login{
                        margin-left:10px;
                    }
                    .search-box{
                        float: left;
                        margin-top: 3px;
                    }
                }
            }
        }
        .head-nav{
            position: relative;
            overflow: hidden;
            width: 88%;
            background-color: #000;
            margin: 0 auto;
            height: 50px;
            margin-top: 10px;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 0 150px;
            .section{
                position: relative;
                top:-16px;
            }
            .nav-box{
                height: 50px;
                position: relative;
                top:15px;
                left: -145px;
                width: 100%;
                background-color: #000;
            }
            .nav-box>ul li{
                float: left;
                margin: 0 15px;
                text-align: center;
                .over{
                    position: relative;
                    display: block;
                    width: 100px;
                    height: 50px;
                    line-height: 50px;
                    left: 10px;
                    top:0px;
                    background-image: url(../../../assets/w_03.jpg);
                }
                .out{
                    position: relative;
                    display: block;
                    width: 100px;
                    height: 50px;
                    top:0px;
                    left: 10px;
                }
            }
        }
    }
</style>