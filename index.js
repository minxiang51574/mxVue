/*
 * @Author: Mx
 * @Date: 2022-01-22 09:35:48
 * @Description: 
 */
import Vue from "./vue.js"
const vm = new Vue({
    el:"#app",
    data:{
        msg:"Hello mx",
        testHtml:"<ul><li>这是什么</li></ul>",
        number:100,
    },
    methods: {
        btnFn(){
            alert(111)
        }
    },
})
console.log(vm);
