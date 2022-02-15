/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description: 
 * Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数
 */
import Dep from "./dep.js";

export default class Watcher {
    /**
     * @description: 
     * @param {*} vm vue实例
     * @param {*} key data属性名
     * @param {*} callback 回调函数
     */    
    constructor(vm,key,cb){
        this.vm = vm
        this.key = key
        this.callback = cb

        //为什么要往dep.target上添加watcher实例
        Dep.target = this;

        //拿到旧值
        //同时注意一点，在这里会触发变量的get方法
        this.oldValue = vm[key]

        Dep.target = null;
    }
    /**数据发生变化更新视图 */
    updated() {
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue){
            return
        }
        this.cb(newValue)
    }

}
//为什么要往dep.target上添加watcher实例？是为了能够将在同一时间只维持一份watcher，因为在computed里，watch里用到时，会添加多个watcher，容易造成数据紊乱，
// 所以在一个时间里只有一个watcher，保证watcher是正常添加的