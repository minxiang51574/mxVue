/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description: Dep
 * 发布订阅模式 存储所有的观察者 每个watcher都有一个update方法 通知subs里每个watcher实例 触发update
 */
export default class Dep {
    constructor(){
        //储存所有的观察者
        this.subs = []
    }
   /** 添加观察者 */
    addsubs(watcher){
        if(watcher && watcher.unpdate){
            this.subs.push(watcher)
        }
    }
   /** 发送通知 */
    notify(){
        this.subs.forEach(watcher=>{
            watcher.unpdate()
        })
    }
}
//dep类在什么时候实例化？在哪里addSubs？
//dep类在什么时候调用notify方法？