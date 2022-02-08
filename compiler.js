import Watcher from "./watcher.js";

/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description: 
 */
export default class Compiler{
    constructor(vm){        
        this.vm = vm
        this.el = vm.$el
        this.methods = vm.$methods

        this.complie(vm.$el)
    }
    /** 编译模板*/
    complie(el){
        //拿到元素的子节点，一个类数组
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node =>{
            console.log('node',node);
            
            if(this.isTextNode(node)){
                //文本节点
                this.complieText(node)
            }else if(this.isElementType(node)){
                //元素节点
                this.compileElement(node);
            }
        })
    }

     //文本节点编译
    complieText(node){
        //{{msg}} msg hello mx
        const reg = /\{\{(.+?)\}\}/
        const value = node.textContent //hello mx
        if(reg.test(value)){
            const key = RegExp.$1.trim(); // 拿到msg
            console.log('key',key);
            node.textContent = value.replace(reg,this.vm[key])
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue 
            })
        }
    }

    //元素节点编译
    compileElement(){

    }

    //判断文本节点
    isTextNode(node){
        return node.nodeType===3;
    }

    //判断元素节点
    isElementType(node){
        return node.nodeType===1;
    }

      //判断v-开头
      isVStartsWith(attr){
        return attr.startsWith('v-');
    }
}