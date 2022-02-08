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
        name:"Hello name"
    },
    methods: {
        hander(){
            alert(111)
        }
    },
})

console.log(vm);
