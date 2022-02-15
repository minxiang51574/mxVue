
/*
 * @Author: Mx
 * @Date: 2022-01-31 09:55:30
 * @Description:  指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
 */
import Watcher from "./watcher.js";

export default class Compiler{
    constructor(vm){        
        this.vm = vm
        this.el = vm.$el
        this.methods = vm.$methods

        this.complie(vm.$el)
    }
    /** 编译模板 对模板进行替换*/
    complie(el){
        //拿到元素的子节点，一个类数组
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node =>{
            console.log('node',node);
            //判断节点类型
            if(this.isTextNode(node)){
                //文本节点
                this.complieText(node)
            }else if(this.isElementType(node)){
                //元素节点
                this.compileElement(node);
            }

            if(node.childNodes && node.childNodes.length > 0){
                this.complie(node)
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

             //数据需要动态改变，所以需要依赖收集
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue 
            })
        }
    }

    //元素节点编译
    compileElement(node){
        console.log('node11',node,node.attributes);
        if(node.attributes.length > 0){
            Array.from(node.attributes).forEach(attr=>{
                //属性名
                console.log('attrObj',attr);
                const attrName = attr.name
                console.log('attrName',attrName);
                //判断是否是v-开头
                if(this.isVStartsWith(attrName)){
                    //特殊判断是：号 例如v-on:click
                    const directiveName = attrName.indexOf(':') > -1 ? attrName.substr(5):attrName.substr(2)
                    //拿到值 v-model='msg'的msg
                    console.log('directiveName',directiveName);
                    
                    let key = attr.value
                    this.update(node,key,directiveName)
                }
                
            })
        }
    }

    // 进行拼接 找到对应函数
    update(node,key,directiveName){
        //v-model v-text v-html v-on:click
        const updaterFn = this[directiveName+'Updater']
        updaterFn && updaterFn.call(this,node,this.vm[key],key,directiveName)
    }

    //v-text
    textUpdater(node,value,key){
        console.log('textUpdater');
        
        node.textContent = value
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        })
    }

    //v-model
    modelUpdater(node,value,key){
        console.log('modelUpdater');
        
        //对应于input
        node.value = value
        new Watcher(this.vm,key,(newValue)=>{
            node.value = newValue
        })

        node.addEventListener('input',()=>{
            //触发setter
            this.vm[key] = node.value
        })
    }

    //v-html
    htmlUpdater(node,value,key){
        console.log('htmlUpdater',value);
        console.log('node',node);
        
        node.innerHTML = value

        new Watcher(this.vm,key,(newValue)=>{
            node.innerHTML = newValue
        })
    }  
    
    //v:on-click
    clickUpdater(node,value,key,directiveName){
        node.addEventListener(directiveName,this.vm.$methods[key])
    }

    //判断文本节点
    isTextNode(node){
        return node.nodeType === 3;
    }

    //判断元素节点
    isElementType(node){
        return node.nodeType === 1;
    }

    //判断v-开头
    isVStartsWith(attr){
        console.log('attr',attr);
        return attr.startsWith('v-');
    }
}