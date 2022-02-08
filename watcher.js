/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description: 观察者Watcher
 */
import Dep from "./dep.js";

export default class Watcher {
    /**
     * @description: 
     * @param {*} vm vue实例
     * @param {*} key data属性名
     * @param {*} callback 回调函数
     */    
    constructor(vm,key,callback){
        this.vm = vm
        this.key = key
        this.callback = callback

        //为什么要往dep.target上添加watcher实例
        Dep.target = this;

        this.oldValue = vm[key]

        Dep.target = null;
    }
    /**数据发生变化更新视图 */
    updated() {
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue){
            return
        }
        this.callback()
    }

}
//为什么要往dep.target上添加watcher实例？是为了能够将在同一时间只维持一份watcher，因为在computed里，watch里用到时，会添加多个watcher，容易造成数据紊乱，
// 所以在一个时间里只有一个watcher，保证watcher是正常添加的