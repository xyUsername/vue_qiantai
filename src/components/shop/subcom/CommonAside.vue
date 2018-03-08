<template>
    <!-- 商品列表右侧推荐商品 -->
    <div class="left-220">
        <ul class="side-img-list">
            <li v-for="(item, i) in list" :key="item.id">
                <div class="img-box">
                    <label>{{ i + 1 }}</label>
                    <img :src="item.img_url">
                </div>
                <div class="txt-box">
                    <router-link :to="{ name:'detail',params:{id:item.id} }">{{ item.title }}</router-link>
                    <span>{{ item.add_time | data }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    //接受父组件传过来的值;
    props: ["list"],
    //局部过滤器
    filters: {
        //日期过滤
        data(tplDate){
            let date = new Date(tplDate);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
    }
};
</script>

<style scoped>

</style>