/*
 * @Author: Mx
 * @Date: 2022-01-18 13:12:27
 * @Description: Vue构造函数 配置参数等
 */
import Observer from "./observer.js";
import Complier from "./compiler.js";
export default class Vue {
    constructor (options = {}){
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods

        this.initRootElement(options)

        // 利用Object.defineProperty将data里的属性注入到vue实例中
        this._proxyData(this.$data)

        // 实例化observer对象 监听数据变化
        new Observer(this.$data)
        // 实例化Complier对象 解析指令和模板
        new Complier(this)


    }
    /**
     * 获取根元素 并存储到vue实现 检查传入的el是否合规
     */
    initRootElement(options){
        if(typeof options.el === 'string'){
            this.$el = document.querySelector(options.el)
        }else if (options.el instanceof HTMLElement){
            //真实的元素
            this.$el = options.el
        }

        if(!this.$el){
            throw new Error("el不合法")
        }
    }

    _proxyData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    if(data[key] === newValue){
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}