/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description: 数据监听器Observer
 * 依赖收集和派发更新就是在这里实现
 */
import Dep from "./dep.js"
export default class Observer {
    constructor(data){
        this.traverse(data)
    }
    /**递归遍历data里的所有属性 */
    traverse(obj){
        console.log('obj',obj);
        if(!obj || typeof obj !== 'object'){
            return
        }
        //遍历监听数据
        Object.keys(obj).forEach(data => {            
            this.defineReactive(obj,data,obj[data])
        });
    }
    /**给传入数据设置setter getter */
    defineReactive(obj,data,value){
        
        //可能又是一个object
        this.traverse(value)

        //实例化dep
        let dep = new Dep()

        //保存this
        const that = this

        Object.defineProperty(obj,data,{
            enumerable:true,
            configurable:true,
            get(){
                //在这里添加依赖 拿到绑定dep身上的watcher
                Dep.targer && dep.addsubs(Dep.targer)
                //这一步不能够用obj[data]，会造成循环的get这个值
                return value
            },
            set(newValue){
                if(value === newValue){
                    return
                }
                value = newValue
                //可能是一个object
                that.traverse(newValue)

                //派发更新
                dep.notify()
            }

        })
    }
}