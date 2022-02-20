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
        //遍历subs数组，调用每一个watcher的updatae方法
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}
//dep类在什么时候实例化？在哪里addSubs？
// => Observer遍历各个属性的时候实例化
// => get 收集依赖 addSubs
//dep类在什么时候调用notify方法？
// => set 派发更新 notify