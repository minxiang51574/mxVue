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

        // 初始化el 对传进来的根元素进行判断
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
         //通过Object.defineProperty将data里的属性绑定到vue实例上
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                //表示可以被枚举，也就是可以被循环
                enumerable:true,
                //表示可以进行相应配置
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
    console.log('1111');
    
    //_proxyData函数用于将属性绑定在vue实例上，而不是用于进行依赖的收集和派发更新，所以不用递归的对每一个值进行劫持
}