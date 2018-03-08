import Vue from 'vue'
export default {
    //定义状态,想当与data
    state:{
        //存储格式为{id:num,id:num}
        cart: JSON.parse(localStorage.getItem('cart')) || {}
        //右上角的数据

    },
    //想当于computed;
    getters: {
        total(state){
            // values先拿到对象里的val数量, 然后reduce把他们合并相加
            return Object.values(state.cart).reduce((sum,v)=> sum += v,0);
        }
    },
    //这里的方法第一个参数规定为state,有vuex固定传值,第二个为自由传值;
    mutations: {
        modify(state,data){
            //S6新语法结构;
            let {id , num} = data;
            // state.cart[id] = num;//根据id修改对应的num数量;
            //如果用上面的方法,视图不会刷新的;
            Vue.set(state.cart,id,num);
            //为了避免刷新页面,数据就清空,所以存在本地;
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        del(state,id){
            //delete第一个参数是删除的对象,第二个是删除的键;
            Vue.delete(state.cart,id);
            // 每次状态变化后, 把新的状态记录在本地storage里, 防止页面刷新后数据丢失,同时可以刷新localStorage里的数据刷新;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
}