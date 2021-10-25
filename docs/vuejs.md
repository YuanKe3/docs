---
sidebarDepth: 3
---
# vuejs笔记

## 1.1 v-html

### 1.1.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 
        {{JS表达式}}
     -->
     <div id="app">
         <h3>1. {{}}双大括号输出文本内容</h3>
         <!-- 文本内容 -->
         <p>{{message}}</p>
         <!-- js表达式 -->
         <p>{{score + 1}}</p>
         <h3>2. 一次性插值 v-once</h3>
         <span v-once>{{message}}</span>
         <h3>3. 指令输出真正的 HTML 内容 v-html</h3>
         <p>双大括号，{{contentHtml}}</p>
         <p>v-html:<span v-html="contentHtml"></span></p>
     </div>
     <script src="./node_modules/vue/dist/vue.js"></script>
     <script>
         var vm = new Vue({
             el: '#app',
             data: {
                 message: 'helloworld',
                 score: 100,
                 contentHtml: '<span style="color:red">此内容为红色字体</span>'
             }
         })
     </script>
</body>
</html>
```

## 1.2 元素绑定指令 v-bind

- 完整格式：v-bind：元素的属性名’xxxx’
- 缩写格式：:元素的属性名=‘xxxx’
    ==作用：将数据动态绑定到指定的元素上==

### 1.2.1 示例代码

```javasc
<h3>4. 元素绑定指令 v-bind</h3>
         <img v-bind:src="imgUrl">
         <img :src="imgUrl">
     </div>
     <script src="./node_modules/vue/dist/vue.js"></script>
     <script>
         var vm = new Vue({
             el: '#app',
             data: {
                 message: 'helloworld',
                 score: 100,
                 contentHtml: '<span style="color:red">此内容为红色字体</span>',
                 imgUrl: 'https://v3.cn.vuejs.org/logo.png'
             }
         })
     </script>
```

## 1.3 Class与Style绑定v-bind

> 通过class列表和style指定样式是数据绑定的一个常见需求，它们都是元素的属性，都用v-bind处理，其中表达式结果的类型可以是：字符串、对象或数组。
> test

### 1.3.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            color: green;
        }
        .delete {
            background-color: red;
        }
        .error {
            font-size: 35px;
        }
    </style>
</head>
<body>
    <div id="app">
        <h3>Class绑定，v-bind:class 或 :class</h3>
        <!-- <p class="active">字符串表达式</p> -->
        <p v-bind:class="activeClass">字符串表达式</p>
        <!-- key值是样式名，value值是data中绑定的属性
        当isDelete为true的时候，delete就会进行渲染
        -->
        <p :class="{delete: isDelete, error: hasError}">对象表达式</p>
        <p :class="['active', 'error']">数组表达式</p>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                activeClass: 'active',
                isDelete: false,
                hasError: true
            }
        })
    </script>
</body>
</html>
```

## 1.4 style绑定v-bind

### 1.4.1 示例代码

```javascript
<h3>Style绑定，v-bind:style 或 :style</h3>
     <p :style="{color: activeColor, fontSize: fontSize + 'px'}">Style绑定</p>


data: {
             activeClass: 'active',
             isDelete: false,
             hasError: true,
             activeColor: 'red',
             fontSize: 80
         }
```

## 1.5 条件渲染v-if

- v-if: 是否渲染当前元素
- v-else
- v-else-if
- v-show与v-if类似，只是元素始终会被渲染并保留再DOM中，只是简单切换元素的CSS属性display来显示或隐藏，频繁操作的话选择v-show

### 1.5.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            width: 200px;
            height: 200px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>v-if 条件渲染</h1>
        <input v-model="seen" type="checkbox">勾选后显示红色小块
        <div v-if="seen" class="box"></div>
        <p v-else="seen">红色小块隐藏了</p>
        <h3>v-show 条件渲染</h3>
        <div v-show="seen" class="box"></div>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                seen: true
            }
        })
    </script>
</body>
</html>
```

## 1.6 列表渲染v-for

### 1.6.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=<>, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <h3>1. 迭代数组</h3>
        <ul>
            <!-- 
                e 代表的是emps数组的别名，index 数组下标，从0开始的
                注意：使用 key 的特殊属性，它会基于 key 的变化重新排列元素顺序，并且会移出 key 不存在的元素
            -->
            <li v-for="(e, index) in emps">
                编号：{{index + 1}}，姓名：{{e.name}}，工资：{{e.salary}}
            </li>
        </ul>
        <h3>2. 迭代对象</h3>
        <ul>
            <!-- value对应对象的属性值，key对应对象的属性名，index索引值 -->
            <li v-for="(value, key, index) in person">
                第{{index + 1}}个属性为: {{key}} = {{value}}
            </li>
        </ul>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                emps: [
                    {name: '马云禄', salary: '20000'},
                    {name: '马腾', salary: '10000'},
                    {name: '马超', salary: '13000'}
                ],
                person: {
                    name: '小梦',
                    age: 18
                }
            }
        })
    </script>
</body>
</html>
```

## 1.7 事件处理v-on

### 1.7.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <h3>1. 事件处理方法 v-on 或 @</h3>
        <button v-on:click="say">Say {{msg}}</button>
        <!-- $event代表的是原生的 DOM事件 -->
        <button @click="warn('hello', $event)">Warn</button>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: 'Hello World'
            },
            methods: {
                say: function (event) {
                    // event代表的是Dom原生事件，Vue.js会自动把它传进来
                    alert(this.msg)
                    alert(event.target.innerHTML)
                },
                warn: function (name) {
                    // 如果函数有多个参数，而需要使用原生事件，则需要使用 $event 作为参数传入
                    alert(name + ',' + event.target.tagName )
                }
            },
        })
    </script>
</body>
</html>
```

## 1.8 时间修饰符

- stop：阻止单击事件继续传播event.stopPropagation()
- prevent：阻止事件默认行为event.preventDefault()
- once：点击事件将只会触发一次

### 1.8.1 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <h3>1. 事件处理方法 v-on 或 @</h3>
        <button v-on:click="say">Say {{msg}}</button>
        <!-- $event代表的是原生的 DOM事件 -->
        <button @click="warn('hello', $event)">Warn</button>
        <h3>2. 事件修饰符</h3>
        <!-- 2.1 防止单击事件继续传播 -->
        <div @click="todo">
            <button @click="doThis">单击事件会继续传播</button>
        </div><br>
        <div @click="todo">
            <!-- stop作用，是阻止事件的传播 -->
            <button @click.stop="doThis">阻止单击事件会继续传播</button>
        </div><br>
        <!-- 2.2 阻止事件的默认行为 -->
        <a href="https://www.baidu.com" @click.prevent="doStop">百度官网</a>
        <!-- 2.3 点击事件只会出发一次 -->
        <button @click.once="doOnly">点击事件只会触发一次，{{num}}</button>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: 'Hello World',
                num: 0
            },
            methods: {
                say: function (event) {
                    // event代表的是Dom原生事件，Vue.js会自动把它传进来
                    alert(this.msg)
                    alert(event.target.innerHTML)
                },
                warn: function (name) {
                    // 如果函数有多个参数，而需要使用原生事件，则需要使用 $event 作为参数传入
                    alert(name + ',' + event.target.tagName )
                },
                doThis: function () {
                    alert('doThis...')
                },
                todo: function () {
                    alert('todo...')
                },
                doStop: function () {
                    alert('doStop...href默认行为被阻止')
                },
                doOnly: function () {
                    this.num ++
                }
            },
        })
    </script>
</body>
</html>
```

## 1.9 v-model进一步拓展：双向绑定

### 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <div id="demo">
                <!-- @submit.prevent 阻止事件的默认行为，当前阻止的是action行为 -->
            <form action="#" @submit.prevent="submitForm">
                姓名(文本)：<input type="text" v-model="name">
                <br><br>
    
                性别(单选按钮)：
                    <input name="sex" type="radio" value="1" v-model="sex"/>男
                    <input name="sex" type="radio" value="0" v-model="sex"/>女
                <br><br>
    
                技能(多选框)：
                    <input type="checkbox" name="skills" value="java" v-model="skills">Java开发
                    <input type="checkbox" name="skills" value="vue" v-model="skills">Vue.js开发
                    <input type="checkbox" name="skills" value="python" v-model="skills">Python开发
                <br><br>
    
                城市(下拉框)：
                <select name="citys" v-model="city">
                    <option v-for="c in cities" :value="c.code">
                        {{c.name}}
                    </option>
                </select>
                <br><br>
    
                说明(多行文本)：<textarea cols="30" rows="5" v-model="desc"></textarea>
                <br><br>
                <button type="submit">提交</button>
            </form>
        </div>
        <script src="./node_modules/vue/dist/vue.js"></script>
        <script>
            new Vue({
                el: '#demo',
                data: {
                    name: '',
                    sex: 1, // 默认选中的是男
                    skills: ['vue', 'python', 'java'], // 默认选中 vue.js开发
                    cities: [
                        {code: 'bj', name: '北京'},
                        {code: 'sh', name: '上海'},
                        {code: 'gz', name: '广州'}
                    ],
                    city: 'sh',
                    desc: ''
                },
                methods: {
                    submitForm: function () { //处理提交表单
                        // 发送ajax异步处理
                        alert(this.name + ',' + this.sex + ',' + this.skills + ',' + this.city + ',' + this.desc)
                    }
                },
            })
        </script>
    </body>
</html>
```

## 2.1 过渡动画图片演示

<!-- ![5555.png](../_resources/5555.png) -->

## 2.2 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 显示或隐藏的过渡效果 */
        .bd-enter-active, .bd-leave-active {
            transition: opacity 1s;  /* 过渡，渐变效果持续时长1s */
        }
        /* 显示前或隐藏后的效果 */
        .bd-enter, .bd-leave-to {
            opacity: 0; /* 都是隐藏效果 */
        }
        /* 可以针对显示和隐藏指定不同的效果 */
        /* 显示过渡效果 1秒 */
        .bai-enter-active {
            transition: all 1s; /* all 所有效果，持续1s */
        }
        /* 隐藏过渡效果 5秒 */
        .bai-leave-active {
            transition: all 5s; /* all 所有效果，持续5s */
        }
        /* 显示前或隐藏后的效果 */
        .bai-enter, .bai-leave-to {
            opacity: 0;
            transform: translateX(10px); /* 水平方向 移动 10px */
        }
    </style>
</head>
<body>
    <div id="app1">
        <button @click="show = !show">渐变过渡</button>
        <transition name="bd">
            <p v-show="show">baidu</p>
        </transition>
    </div>
    <div id="app2">
        <button @click="show = !show">渐变平滑过渡</button>
        <transition name="bai">
            <p v-show="show">baidu</p>
        </transition>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app1',
            data: {
                show: true
            }
        })
        new Vue({
            el: '#app2',
            data: {
                show: true
            }
        })
    </script>
</body>
</html>

-----------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 显示过程中的动画效果 */
        .bounce-enter-active {
            animation: bounce-in 1s;
        }
        /* 隐藏过程中的动画效果 */
        .bounce-leave-active {
            animation: bounce-in 1s reverse;
        }
        @keyframes bounce-in {
            0% { /* 持续时长百分比，比如0%代表0秒，50%表示0.5秒 */
                transform: scale(0); /* 缩小为0 */
            }
            50% {
                transform: scale(1.5); /* 放大1.5倍 */
            }
            100% {
                transform: scale(1); /* 还原 */
            }
        }
    </style>
</head>
<body>
    <div id="demo">
        <button @click="show = !show">放大缩小动画</button>
        <transition name="bounce">
            <p v-show="show">梦学谷-陪你学习，伴你成长</p>
        </transition>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#demo',
            data: {
                show: true
            }
        })
    </script>
</body>
</html>
```

## 3.1 v-pre

作用：
显示原来文本。

代码：

```html
<span v-pre>{{你好，百度}}
</span>
```

## 3.2 v-text/v-clock

作用：
解决{{}}的闪烁缺点

代码：

```html
<div id="app" v-clock=""><span v-pre="">{{你好，百度}}</span>

    ### {{message}}

    ### {{message}}

    ### {{message}}

</div>
```

## 3.3 自定义指令

需求：

1.  实现输出文本内容全部自动转为大写，字体为红色，功能类型v-text，但显示内容为大写；
2.  当页面加载时，该元素获得焦点（注意：autofocus）在移动版safari上不工作

代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p v-upper-text="message">xxxxx</p>
        自动获取焦点: <input type="text" v-focus>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        // 第一个参数为指令名，但是不要有v-开头
        Vue.directive('upper-text',{
            // 一般对样式的操作在bind中，但是只调用一次
            bind: function (el) {
                el.style.color = 'red'
            },
            // 一般对js操作在inserted中，但是只调用一次
            // el时当前指令作用的那个Dom元素，
            //binding用于获取使用了当前指令的定值(value)、表达式(expression)、指令名(name)
            inserted: function (el, binding) {
                // 将所有字母文本内容转换为大写
                el.innerHTML = binding.value.toUpperCase()
                // e1.innerHTML = binding.expression.toUpperCase()
                // e1.innerHTML = binding.name.toUpperCase()
            }
        })
        new Vue({
            el: '#app',
            data: {
                message: 'abcde百度一下，你就知道'
            },
            // 注册局部自定义指令
            directives: {
                'focus': { // 指令名
                    // 刷新页面自动获取焦点
                    inserted: function (el, binding) {
                        // 被 v-focus 作用的那个元素在刷新页面会自动 获取焦点
                        el.focus()
                    }
                }
            }
        })
    </script>
</body>
</html>

```

## 4.1.1 todoMVC项目代码

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Template • TodoMVC</title>
        <link rel="stylesheet" href="node_modules/todomvc-common/base.css">
        <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
        <!-- CSS overrides - remove if you don't need it -->
        <link rel="stylesheet" href="css/app.css">
    </head>
    <body>
        <section class="todoapp" id="todoapp">
            <header class="header">
                <h1>todos</h1>
                <!-- 添加任务 -->
                <input 
                 @keyup.enter="addItem" class="new-todo" placeholder="What needs to be done?" v-app-focus>
            </header>
            <template v-if="items.length">
                <!-- This section should be hidden by default and shown when there are todos -->
                <section class="main">
                    <input v-model="toggleAll" id="toggle-all" class="toggle-all" type="checkbox">
                    <label for="toggle-all">Mark all as complete</label>
                    <ul class="todo-list">
                        <!-- These are here just to show the structure of the list items -->
                        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                        <li v-for="(item, index) in filterItems" :class="{completed: item.completed, editing: item === currentItem}">
                            <div class="view">
                                <input class="toggle" type="checkbox" v-model="item.completed">
                                <label @dblclick="toEdit(item)">{{item.content}}</label>
                                <button class="destroy" :value="item.id" @click="removeItem(index)"></button>
                            </div>
                            <input v-todo-focus="item === currentItem" @keyup.enter="finishEdit(item, index, $event)" @blur = "finishEdit(item, index, $event)"
                             @keyup.esc="cancelEdit" class="edit" :value="item.content">
                        </li>
                    </ul>
                </section>
                <!-- This footer should be hidden by default and shown when there are todos -->
                <!-- items.length 当值为0时，表示false，则不显示 -->
                <!-- template元素，页面渲染之后template元素就不会有 -->
                <!-- 需要使用 v-if 与template搭配，不要用v-show -->
                <footer class="footer">
                    <!-- This should be `0 items left` by default -->
                    <span class="todo-count"><strong>{{remaining}}</strong> item{{ remaining === 1 ? '' : 's' }} left</span>
                    <!-- Remove this if you don't implement routing -->
                    <ul class="filters">
                        <li>
                            <a :class="{selected: filterStatus === 'all'}" href="#/">All</a>
                        </li>
                        <li>
                            <a :class="{selected: filterStatus === 'active'}" href="#/active">Active</a>
                        </li>
                        <li>
                            <a :class="{selected: filterStatus === 'completed'}" href="#/completed">Completed</a>
                        </li>
                    </ul>
                    <!-- Hidden if no completed items are left ↓ -->

                    <!-- 当前任务数 大于 未完成任务数量，则显示下面按钮 -->
                    <button v-show="items.length > remaining" 
                    @click="removeCompleted()" class="clear-completed">Clear completed</button>
                </footer>
            </template>
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <!-- Remove the below line ↓ -->
            <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            <!-- Change this out with your name and url ↓ -->
            <p>Created by <a href="http://todomvc.com">you</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
        <!-- Scripts here. Don't remove ↓ -->
        <script src="./node_modules/vue/dist/vue.js"></script>
        <script src="node_modules/todomvc-common/base.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>
```

```javascript
(function (Vue) { // 表示依赖了全局的 Vue

    const STORAGE_KEY = 'items-vuejs'
    // 进行本地存储、获取数据
    const itemStorage = {
        // 获取数据
        fetch: function () {
            // 获取出来的是json字符串，通过parse将字符串转换成数组对象
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        },
        // 保存数据
        save: function (items) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    }

    // const表示申明的变量是不可变的，ES6
    const items = [
        {
            id: 1, // 主键id
            content: 'vue.js', // 输入的内容
            completed: false // 是否完成
        },
        {
            id: 2, // 主键id
            content: 'java', // 输入的内容
            completed: false // 是否完成
        },
        {
            id: 3, // 主键id
            content: 'python', // 输入的内容
            completed: false // 是否完成
        }
    ]

    // 注册全局指令
    Vue.directive('app-focus', {
        inserted (el, binding) {
            // 聚焦元素
            el.focus()
        }
    })

    var app = new Vue({
        el: '#todoapp',
        data: {
            // items, // 这是对象属性的简写方式，等价于items: items
            items: itemStorage.fetch(),
            currentItem: null, // 代表的是点击的那个任务项
            filterStatus: 'all' // 接受变化的的状态值
        },
        // 定义监听器
        watch: {
            // 当对象中的某个属性发生改变之后，默认情况下不会被监听到
            // 如果希望修改对象属性，需要
            // items: function (newValue, old) {
            // 	console.log('watch', newValue)
            // }
            // 深度监听，当对象中的属性值发生变化后，使用deep:true选择则可以实现监听
            items: {
                deep: true,
                handler: function (newItems, oldItems) {
                    // 将数据保存到本地
                    itemStorage.save(newItems)
                }
            }
        },
        // 自定义局部指令
        directives: {
            'todo-focus': {
                update (el, binding) {
                    // 只有双击的那个元素才会获取焦点
                    if(binding.value) {
                        el.focus()
                    }
                }
            }
        },
        //定义计算属性
        computed: {
            // 根据不同状态过滤出不同数据
            filterItems () { // filterItem: function () {}
                // 当filterStatus状态发生变化时，则过滤出不同的数据
                // 判断 filterStatus 状态值
                switch (this.filterStatus) {
                    case 'active':
                        // 过滤出未完成的数据 filter
                        return this.items.filter(item => !item.completed)
                        break;
                    case 'completed':
                        // 过滤出所有已经完成的数据
                        return this.items.filter(item => item.completed)
                        break;
                    default:
                        // 当上面都不满足时，则返回所有数据
                        return this.items
                        break;
                }

            },
            toggleAll: {
                // 当任务列表中的状态发生变化之后，就更新复选框的状态
                get: function () { // get () {}
                    console.log('get', this.remaining)
                    return this.remaining === 0
                },
                // 当复选框的状态更新之后，则将人物列表中的状态更新
                set: function (newStatus) {
                    console.log('set')
                    // 当点击复选框之后，复选框的值会发生改变，就会触发 set 方法调用，
                    // 将迭代出数组中的所有任务项，然后将当前复选框的状态值赋值给每一个任务的状态值
                    this.items.forEach((item) => {
                        item.completed = newStatus
                    })
                    // () => {} 等价于 function () {}
                }
            },
            // 剩余未完成任务数量
            remaining () { // remaining: function () {
                // 数组filter函数过滤过所有未完成的任务项
                // unItems用于接受过滤之后未完成的任务项，他是一个数组
                const unItems = this.items.filter(function(item) {
                    return !item.completed
                })
                return unItems.length
            }
        },

        // 完成编辑，保存数据
        methods: {
            finishEdit (item, index, event) {
                // 1. 获取当前输入框的值
                const content = event.target.value.trim()
                // 2. 判断 输入框的值是否为空，若空，则删除任务项
                if (!content) {
                    // 复用了下面的函数
                    this.removeItem(index)
                }
                // 3. 若不空，则添加到任务项
                item.content = content
                // 4. 移出.editing样式，退出编辑状态
                this.currentItem = null
            },
            // 取消编辑
            cancelEdit () {
                // 当 this.currentItem 为空时，editing始终为false
                this.currentItem = null
            },
            toEdit (item) {
                // 进入编辑状态
                console.log(item)
                // 将点击的那个任务项item赋值给currentItem，用于页面.editing样式重新
                this.currentItem = item
            },
            removeCompleted () { // removeCompleted function () {}
                // 过滤出所有未完成任务项，重新将这个新数组（未完成任务项）赋值给items
                // this.items.filter((item) => {
                // 	return !item.completed
                // })
                this.items = this.items.filter( item => !item.completed)
            },
            removeItem (index) {
                console.log(index)
                this.items.splice(index, 1) // splice(移除下标，移出个数)
            },
            addItem (event) { // es6语法，它等价于addItem: function (event) {}
                console.log('addItem', event.target.value)
                // 1. 获取文本框的内容
                const content = event.target.value.trim()
                // 2. 判断数据是否为空，如果为空，什么都不做
                if (!content.length) { // 如果为空
                    return
                }
                // 3. 若不为空，则添加到数组中
                const id = this.items.length + 1
                this.items.push(
                    {
                        id, // id: id
                        content, // content: content
                        completed: false
                    }
                )
                // 4. 清空文本输入框的内容
                event.target.value = ''
            }
        }
    })

    // 要写Vue示例外面
    // 当路由 hash值 发生变化之后，会自动调用该函数
    window.onhashchange = function () {
        // #/active
        console.log('hash值改变了', window.location.hash)
        // 获取路由的hash，当截取的hash值不为空的时候则返回，为空则返回'all'
        const hash = window.location.hash.substr(2) || 'all' // substr(从这里截取, 截取长度)

        // 状态一旦改变，就会将hash值赋值给filterStatus
        // 定义一个计算属性filterItem来感知filterStatus的变化，当它变化之后，来过滤不同的数据
        app.filterStatus = hash
    }

    // 第一次访问页面时，就调用一次让状态生效
    window.onhashchange()

})(Vue);
```

## 5.2.1 Vue过滤器插件的方法

1.  插件会为Vue添加全局功能，一般是添加全局方法/全局指令/过滤器等
2.  Vue插件有一个公开方法install，通过install方法给Vue添加全局功能
3.  通过全局方法Vue.use()使用插件，它需要在你调用new Vue()启动应用之前完成

## 5.2.2 案例演示

```html
<body>
    <div id="app">
        <span v-my-directive="content"></span>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <!-- 要引入在vue.js下面 -->
    <script src="./js/plugins.js"></script>
    <script>

        // 1. 引入插件MyPlugin，其实就是安装 MyPlugin 插件
        Vue.use(MyPlugin)

        var vm = new Vue({
            el: '#app',
            data: {
                content: 'hello'
            }
        })
        // 调用插件中的 实例方法 ，注意是vm调用，不是Vue
        // 注意，不要少了$符号
        vm.$myMethod('baidu')

        // 调用全局方法，注意是Vue进行调用，不是vm
        Vue.myGlobalMethod()
    </script>
</body>
</html>
```

```javascript
(function() {
    
    // 声明 MyPlugin 插件对象
    const MyPlugin = {}
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
          alert('MyPlugin.myGlobalMethod全局方法调用了')
        }
      
        // 2. 添加全局指令
        Vue.directive('my-directive', {
          inserted (el, binding) {
            el.innerHTML = "MyPlugin.my-directive指令被调用了" + binding.value
          }
        })
            
        // 3. 添加实例方法
        Vue.prototype.$myMethod = function (value) {
            alert('Vue 实例方法myMethod被调用了:' + value)
        }
      }

      // 将插件添加到 window 对象
      window.MyPlugin = MyPlugin
})()
```

## 6.1 组件概念

组件是Vue最强大的功能之一。它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。几乎任意类型的应用界面都可以抽象为一个组件树。

<!-- ![components.png](../_resources/components.png) -->

- 增强可维护性，解决软件上的高耦合、低内聚、无重用的3大代码问题
- Vue中的组件思想借鉴于React
- 目前主流的前端框架: Angular、React、Vue都是组件化开发思想

## 6.2 组件的基本使用

### 6.2.1 全局注册

#### 6.2.1.1 介绍

> 一般把网页中特殊的公共部分注册为全局组件：轮播图、分页、通用导航栏

- 全局注册后，可以在任何新创建的Vue实例(new Vue)的模板中使用
- 简单格式:

```javascript
Vue.component('组件名', {
    template: '定义组件模板',
    data: function() { // data选项在组件必须是一个函数
        return {}
    }
    // 其它选项: methods
})
```

#### 6.2.1.2 示例代码&效果

```html
<body>
    <div id="app">
        <component-a></component-a>
        <component-a></component-a>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        // 全局注册组件
        /*
        组件名:
            1. 驼峰、横线分隔符命名方式
            2. 使用组件时，必须采用横线分隔符的方式进行引用
        组件可以理解为就是特殊的Vue实例，不需要手动的实例化而已，它用于管理自己的模板
        */
        Vue.component('component-a', {
            // template选项指定组件的模板代码
            template: '<div><h1>头部组件---{{ name }}</h1></div>',
            data: function () {  // 在组件中，data选项必须是一个函数
                return {
                    name: '全局组件'
                }
            }
        })

        new Vue({
            el: '#app'
        })
    </script>
</body>
```

<!-- ![01.png](../_resources/01.png) -->

### 6.2.2 局部注册

#### 6.2.2.1 示例代码

```javascript
// 定义局部组件对象
    const ComponentB = {
                template: '<div>this is {{ name }}</div>',
                data: function () {
                    return {
                        name: '局部组件'
                    }
                }
            }

    new Vue({
        el: '#app',
        // 组件选项
        components: {
            // key: value  key 组件名, value 组件对象
            'component-b': ComponentB
        }
    })
```

## 6.3 Bootstrap 首页组件化

### 6.3.1 组件与子组件

1.  组件化html文件时，引用顺序应为: 子组件->组件
2.  component中的组件名可驼峰命名，如AppLeaf，但在html调用时应使用: app-leaf

#### 6.3.1.1 文件结构

> 可以使用>tree /f 文件目录来实现显示目录树

目录树：
│ index.html
│
├─components
│ │ AppLeaf.js
│ │ AppNavbar.js
│ │
│ └─home
│ AppHome.js
│ Dashboard.js
│ HomeList.js
│
└─style
bootstrap.min.css
dashboard.css

#### 6.3.1.2 示例代码(无子组件)

```javascript
==AppLeaf.js:==
;(function () {
    window.AppLeaf = {
        template: `<div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Export</a></li>
        </ul>
        <ul class="nav nav-sidebar">
          <li><a href="">Nav item</a></li>
          <li><a href="">Nav item again</a></li>
          <li><a href="">One more nav</a></li>
          <li><a href="">Another nav item</a></li>
          <li><a href="">More navigation</a></li>
        </ul>
        <ul class="nav nav-sidebar">
          <li><a href="">Nav item again</a></li>
          <li><a href="">One more nav</a></li>
          <li><a href="">Another nav item</a></li>
        </ul>
      </div>`
    }
})()
```

```javascript
==AppNavbar.js==
;(function () {
    window.AppNavbar = {
        template: `<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">{{ projectName }}</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Help</a></li>
      </ul>
      <form class="navbar-form navbar-right">
        <input type="text" class="form-control" @blur="search" placeholder="Search...">
      </form>
    </div>
  </div>
</nav>`,
        data: function () {
          return {
            projectName: '新月统计中心'
          }
        },
        methods: {
          search () {
            alert('失去焦点')
          }
        }
      }
})()
```

#### 6.3.1.3 示例代码(有子组)

```javascript
==AppHome.js==
    ;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <h1 class="page-header">Dashboard</h1>
        <dashboard></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list></home-list>
      </div>`

    window.AppHome = {
        template,
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

```javascript
;(function () {
    const template = `<div class="row placeholders">
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>Label</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>Label</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>Label</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>Label</h4>
      <span class="text-muted">Something else</span>
    </div>
  </div>`
  
    window.Dashboard = {
        template
    }
})()
```

```javascript
;(function () {
    const template = `<div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Header</th>
          <th>Header</th>
          <th>Header</th>
          <th>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>Lorem</td>
          <td>ipsum</td>
          <td>dolor</td>
          <td>sit</td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>amet</td>
          <td>consectetur</td>
          <td>adipiscing</td>
          <td>elit</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>Integer</td>
          <td>nec</td>
          <td>odio</td>
          <td>Praesent</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>libero</td>
          <td>Sed</td>
          <td>cursus</td>
          <td>ante</td>
        </tr>
        <tr>
          <td>1,004</td>
          <td>dapibus</td>
          <td>diam</td>
          <td>Sed</td>
          <td>nisi</td>
        </tr>
        <tr>
          <td>1,005</td>
          <td>Nulla</td>
          <td>quis</td>
          <td>sem</td>
          <td>at</td>
        </tr>
        <tr>
          <td>1,006</td>
          <td>nibh</td>
          <td>elementum</td>
          <td>imperdiet</td>
          <td>Duis</td>
        </tr>
        <tr>
          <td>1,007</td>
          <td>sagittis</td>
          <td>ipsum</td>
          <td>Praesent</td>
          <td>mauris</td>
        </tr>
        <tr>
          <td>1,008</td>
          <td>Fusce</td>
          <td>nec</td>
          <td>tellus</td>
          <td>sed</td>
        </tr>
        <tr>
          <td>1,009</td>
          <td>augue</td>
          <td>semper</td>
          <td>porta</td>
          <td>Mauris</td>
        </tr>
        <tr>
          <td>1,010</td>
          <td>massa</td>
          <td>Vestibulum</td>
          <td>lacinia</td>
          <td>arcu</td>
        </tr>
        <tr>
          <td>1,011</td>
          <td>eget</td>
          <td>nulla</td>
          <td>Class</td>
          <td>aptent</td>
        </tr>
        <tr>
          <td>1,012</td>
          <td>taciti</td>
          <td>sociosqu</td>
          <td>ad</td>
          <td>litora</td>
        </tr>
        <tr>
          <td>1,013</td>
          <td>torquent</td>
          <td>per</td>
          <td>conubia</td>
          <td>nostra</td>
        </tr>
        <tr>
          <td>1,014</td>
          <td>per</td>
          <td>inceptos</td>
          <td>himenaeos</td>
          <td>Curabitur</td>
        </tr>
        <tr>
          <td>1,015</td>
          <td>sodales</td>
          <td>ligula</td>
          <td>in</td>
          <td>libero</td>
        </tr>
      </tbody>
    </table>
  </div>`

  window.HomeList = {
      template
  }
})()
```

### 6.3.2 极致组件化

方法步骤：

- 在`03-bootstrap`目录下创建`App.js`文件
- 将`<div id='#app'>`标签体中代码剪切到`App.js`文件中作为模板页面

==注意: template模板中必须要有且只有一个根元素，即在要提取的内容的外层套上`<div></div>`，否则会报错==

#### 6.3.2.1 文件结构

│ App.js
│ index.html
│ main.js
│
├─components
│ │ AppLeaf.js
│ │ AppNavbar.js
│ │
│ └─home
│ AppHome.js
│ Dashboard.js
│ HomeList.js
│
└─style
bootstrap.min.css
dashboard.css

#### 6.3.2.2 示例代码

> 目录树与代码与上面相同，下面代码为不同点

```javascript
==index.html==
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Dashboard Template for Bootstrap</title>
    <!-- Bootstrap core CSS -->
    <link href="style/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="style/dashboard.css" rel="stylesheet">	
  </head>

  <body>
    <div id="app">
      <app></app>
    </div>

      <script src="../node_modules/vue/dist/vue.js"></script>
      <script src="./components/AppNavbar.js"></script>
      <script src="./components/AppLeaf.js"></script>
      <script src="./components/home/Dashboard.js"></script>
      <script src="./components/home/HomeList.js"></script>
      <script src="./components/home/AppHome.js"></script>
      <script src="./App.js"></script>
      <script src="main.js"></script>
  </body>
</html>
```

```javascipt
==main.js==
new Vue({
    el: '#app',
    // Vue实例中的template选项中引用了组件后，会将这个组件的渲染结果替换掉 #app 标签的元素
    // template: '<app/>'是简写
    template: '<app></app>',  // 替换上面的app组件
    components: {
      App  // 等价于App: App
    }
  })
```

## 6.4 组件化注意事项

- 组件可以理解为特殊的Vue实例，不需要手动实例化，管理自己的`template`模板
- 组件的template必须有且只有一个根节点
- 组件的data选项必须是函数，且函数返回一个对象
- 组件与组件之间是相互独立的，可以配置自己的一些选项资源data、methods、computed等
- 思想: 组件自己管理自己，不影响他人

## 6.5 Vue组件间通信

### 6.5.1 组件间通信方式

1.  `prop`父组件向子组件传递数据
2.  `$emit`自定义事件
3.  `slot`插槽分发内容
    

### 6.5.2 组件间通信规则

1.  不要再子组件中直接`修改父组件传递的数据`
2.  数据初始化时，应当看初始化的数据是否用于多个组件中，则初始化在父组件中；如果只在一个组件中使用，那就初始化在这个要使用的组件中
3.  数据初始在在哪个组件，更新数据的方法（函数）就应该定义在哪个组件
    

### 6.5.3 props向子组件传递数据

#### 6.5.3.1 声明组件对象中定义 props

> 在子组件中定义`props`，接收父组件的数据

1.  在声明组件对象中使用`prop`选项指定

```javascript
const Mycomponent = {
            template: '<div></div>',
            props: 此处值由以下3种方式,
            components: {
                子组件
            }
        }
```

- 方式1: 指定传递属性名，注意是数组形式

```javascript
props: ['id', 'name', 'salary', 'isPublished', 'commentIds', 'author', 'getEmp']
```

- 方式2: 指定传递属性名和数据类型，注意是`对象形式`

```javascript
props: {
    id: Number,
    name: String,
    salary: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    getEmp: Function
}
```

- 方式3: 指定属性名、数据类型、必要性、默认值

```javascript
props: {
    type: String,
    required: true,
    default: 'mxg'
}
```

#### 6.5.3.2 引用组件时动态赋值

> 在父组件中使用

在引用组件时，通过v-bind动态赋值

```html
<my-component v-bind:id="2" :name="meng" :salary="9999" :is-published="true" :comment-ids="[1, 2]" :author="{name: 'alan'}" :get-emp="getEmp">
</my-component>
```

#### 6.5.3.3 文件结构

│ App.js
│ index.html
│ main.js
│ package-lock.json
│
├─components
│ │ AppLeaf.js
│ │ AppNavbar.js
│ │
│ └─home
│ AppHome.js
│ Dashboard.js
│ HomeList.js
│ Item.js
│
└─style
bootstrap.min.css
dashboard.css

#### 6.5.3.4 示例代码

```javascript
==App.js==
 ;(function() {
    // 组件模板中，必须包含有且只有一个根元素
    const template = `<div id="#app">
        <!--头部导航区域-->
        <app-navbar></app-navbar>
    
    <!--核心区域:分左右两边-->
        <div class="container-fluid">
        <div class="row">
        
        <!--左边菜单栏区域-->
            <app-leaf></app-leaf>
        
        <!--右边主页面区域: 分上下两个区域-->
            <app-home></app-home>
        </div>
      </div>`

    window.App = {
        template,
        components: {
            AppNavbar,
            AppLeaf,
            AppHome
        }
    }
})()
```

```javascript
==AppHome.js==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <h1 class="page-header">Dashboard</h1>
        <!--通过属性绑定的方式向子组件传递数据-->
        <dashboard :hobbies="hobbies"></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList"></home-list>
      </div>`

    window.AppHome = {
        template,
        data () {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

```javascript
==HomeList.js==
;(function () {
    const template = `<div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>工资</th>
        </tr>
      </thead>
      <tbody>
        <Item v-for="(emp, index) in empList" :key="emp.id" :emp="emp"/>
      </tbody>
    </table>
  </div>`

  window.HomeList = {
    // 声明当前子组件接受父组件传递的属性
      props: {
        empList: Array
      },
      template,
      components: {
        Item
      }
  }
})()
```

```javascript
==Item.js==
;(function () {
    const template = `<tr>
    <td>{{ emp.id }}</td>
    <td>{{ emp.name }}</td>
    <td>{{ emp.salary }}</td>
  </tr>`

  window.Item = {
      props: {
          emp: {  // 指定属性名/数据类型/是否必须
              type: Object,
              required: true
          }
      },
      template
  }
})()
```

```javascript
==Dashboard.js==
;(function () {
    const template = `<div class="row placeholders">
    <div v-for="(hobby, index) in hobbies" :key="index" class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>{{ hobby }}</h4>
      <span class="text-muted">Something else</span>
    </div>
  </div>`
  
    window.Dashboard = {
      // 声明当前子组件接受父组件传递的属性
        props: ['hobbies'],
        template
    }
})()
```

```javascript
==main.js==
new Vue({
    el: '#app',
    // Vue实例中的template选项中引用了组件后，会将这个组件的渲染结果替换掉 #app 标签的元素
    // template: '<app/>'是简写
    template: '<app></app>',  // 替换上面的app组件
    components: {
      App  // 等价于App: App
    }
  })
```

- ==剩余两个js就不写了: AppLeaf.js、AppNavbar.js==

#### 6.5.3.5 传递数据注意

1.  `props`只用于父组件向子组件传递数据
2.  所有标签属性都会称为组件对象的属性，模板页面可以直接引用
3.  问题:
    a. 如果需要向非子后代传递数据，必须多层逐层传递
    b. 兄弟组件间也不能直接`props`通信必须借助父组件才可以

#### 6.5.3.6 props方法传递函数-示例代码

```javascript
==AppHome.js==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <h1 class="page-header">Dashboard</h1>
        <!--通过属性绑定的方式向子组件传递数据-->
        <dashboard :hobbies="hobbies"></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
      </div>`

    window.AppHome = {
        template,
        data () {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },
        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1)
            }
        },
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

```javascript
==HomeList.js==
;(function () {
    const template = `<div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>工资</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <Item v-for="(emp, index) in empList" :key="emp.id" :emp="emp" :deleteEmp="deleteEmp" :index="index"/>
      </tbody>
    </table>
  </div>`

  window.HomeList = {
    // 声明当前子组件接受父组件传递的属性
      props: {
        empList: Array,
        deleteEmp: Function
      },
      template,
      components: {
        Item
      }
  }
})()
```

```javascript
==item.js==
;(function () {
    const template = `<tr>
    <td>{{ emp.id }}</td>
    <td>{{ emp.name }}</td>
    <td>{{ emp.salary }}</td>
    <td>
        <a href="#" @click="deleteItem">删除</a>
    </td>
  </tr>`

  window.Item = {
      props: {
          emp: {  // 指定属性名/数据类型/是否必须
              type: Object,
              required: true
          },
          deleteEmp: Function,
          index: Number
      },
      methods: {
        deleteItem () {
            this.deleteEmp(this.index)
        }
      },
      template
  }
})()
```

### 6.5.4 自定义事件

> 6.5.3.6中，通过props传递函数十分困难，而通过自定义事件就会十分简单了

作用：==通过自定义事件按来代替props传入函数形式==

#### 6.5.4.1 绑定自定义事件

```javascript
// 通过 v-on 绑定
// @自定义事件名=事件监听函数
// 上面都是父组件的操作
// 在子组件 dashboard 中触发 delete_hobby 事件来调用 deleteHobby 函数
```

#### 6.5.4.2 触发监听事件函数执行

在子组件中触发父组件的监听事件函数调用

```javascript
// 子组件触发事件函数调用
// this.$emit(自定义事件名, data)
this.$emit('delete_emp', index)
```

#### 6.5.4.3 自定义事件注意

1.  自定义事件只用于 子组件向父组件发送消息(数据)
2.  隔代组件或兄弟组件间通信此种方式不合适

#### 6.5.4.4 示例代码

```javascript
==Dashboard==
;(function () {
    const template = `<div class="row placeholders">
    <div v-for="(hobby, index) in hobbies" :key="index" class="col-xs-6 col-sm-3 placeholder">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>{{ hobby }}</h4>
      <span class="text-muted">
        <!-- index参数和deleteHobby函数 传入到父组件中 -->
        <a href="#" @click="deleteHobby(index)">删除</a>
      </span>
    </div>
  </div>`
  
    window.Dashboard = {
      // 声明当前子组件
        props: ['hobbies'],
        methods: {
          deleteHobby (index) {
            // 删除点击的爱好
            // 触发父组件中 delete_hobby 事件进行删除操作 
            this.$emit('delete_hobby', index)
          }
        },
        template
    }
})()
```

```javascript
==AppHome.js==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <h1 class="page-header">Dashboard</h1>
        <!--
        通过属性绑定的方式向子组件传递数据
        @自定义事件名=事件监听函数
        在子组件 dashboard 中触发了 delete_hobby 事件来调用 deleteHobby 函数
        -->
        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
      </div>`

    window.AppHome = {
        template,
        data () {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },
        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1)
            },
            deleteHobby (index) {
                this.hobbies.splice(index, 1)
            }
        },
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

### 6.5.5 slot插槽

作用: ==主要用于父组件向子组件传递 标签+数据，(而上面prop和自定义事件只是传递数据)==

场景: 一般时某个位置需要经常动态切换希纳是效果(如饿了么)

#### 6.5.5.1 子组件定义插槽

在子组件中定义插件，当父组件向指定插槽传递标签数据后，插槽处就被渲染，否则插槽处就不会被渲染

#### 6.5.5.2 插槽注意事项

1.  只能用于父组件向子组件传递 标签+数据
2.  传递的插槽标签中的数据处理都需要定义所在的父组件中

#### 6.5.5.3 实例代码

```javascript
==App.js==
;(function() {
    // 组件模板中，必须包含有且只有一个根元素
    const template = `<div id="#app">
        <!--头部导航区域-->
        <app-navbar></app-navbar>
    
    <!--核心区域:分左右两边-->
        <div class="container-fluid">
        <div class="row">
        
        <!--左边菜单栏区域-->
            <app-leaf></app-leaf>
        
        <!--右边主页面区域: 分上下两个区域-->
            <app-home>
                <h1 slot="dashboard" class="page-header">{{ title }}</h1>
            </app-home>
        </div>
      </div>`

    window.App = {
        template,
        data: function () {
            return {
                title: '仪表盘'
            }
        },
        components: {
            AppNavbar,
            AppLeaf,
            AppHome
        }
    }
})()
```

```javascript
==AppHome.js==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <!-- <h1 class="page-header">Dashboard</h1> -->
        <!-- 定义插槽 -->
        <slot name="dashboard"></slot>

        <!--
        通过属性绑定的方式向子组件传递数据
        @自定义事件名=事件监听函数
        在子组件 dashboard 中触发了 delete_hobby 事件来调用 deleteHobby 函数
        -->
        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
      </div>`

    window.AppHome = {
        template,
        data () {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },
        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1) 
            },
            deleteHobby (index) {
                this.hobbies.splice(index, 1)
            }
        },
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

## 6.6 非父子组件间通信 PubSubJS

### 6.6.1 介绍

Vue.js可通过`PubSubJS`库来实现非父子组件之间的通信，使用`PubSubJS`的消息发布与订阅模式，来进行数据的传递。

理解: 订阅信息`====`绑定事件监听，发布消息`====`触发事件。

注意: 但是必须先执行订阅事件`subscribe`，然后才能`publish`发布事件。

### 6.6.2 订阅消息

==先在`created`钩子函数中订阅消息==

```javascript
// event接收的是消息名称，data接收发布时传递的数据
PubSub.subscribe('消息名称(相当于事件名)', function(event, data) {
    // 事件回调处理
})
```

### 6.6.3 触发事件

```javascript
PubSub.publish('消息名称(相当于事件名)', data)
```

### 6.6.4 案例

> 点击删除后，左侧导航栏显示删除个数

```javascript
==AppLeaf.js==
;(function () {
  const template = `<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar">
    <li class="active"><a href="#">Overview 
    <span v-show="delNum">({{ delNum }})</span>
    </a></li>
    <li><a href="#">Reports</a></li>
    <li><a href="#">Analytics</a></li>
    <li><a href="#">Export</a></li>
  </ul>
</div>`
    window.AppLeaf = {
        template,
        data () {
          return {
            delNum: 0 // 已经删除的总数量
          }
        },
        created() {
          // 订阅消息
          PubSub.subscribe('changeNum', (event, num) => { // 箭头函数没有自己的this，只有它的父亲，故代表外面的实例即Appleaf，而不是PubSub
            // 事件回调处理
            // 统计一下已经删除的总数量
            this.delNum = this.delNum + num
          })
        }
    }
})()
```

```javascript
==AppHome==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
        <!-- <h1 class="page-header">Dashboard</h1> -->
        <!-- 定义插槽 -->
        <slot name="dashboard"></slot>

        <!--
        通过属性绑定的方式向子组件传递数据
        @自定义事件名=事件监听函数
        在子组件 dashboard 中触发了 delete_hobby 事件来调用 deleteHobby 函数
        -->
        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
        
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
      </div>`

    window.AppHome = {
        template,
        data () {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },
        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1) 
            },
            deleteHobby (index) {
                this.hobbies.splice(index, 1)
                // 删除之后，发布消息，导航组件(左侧)来统计已删除的总数量
                PubSub.publish('changeNum', 1) // 上面删除的是1条
            }
        },
        components: {  // Dashboard 作为 AppHome 的子组件
            Dashboard,
            HomeList
        }
    }
})()
```

### 6.6.5 单文件组件

自行百度。

## 7.1 Vue实例生命周期

### 7.1.1 生命周期钩子函数

#### 7.1.1.1 图示

<!-- ![生命周期](https://cn.vuejs.org/images/lifecycle.png) -->

#### 7.1.1.2 示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生命周期</title>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            /* el: '#app', */
            data: {
                message: 'baidu'
            },
            beforeCreate() {
                // Vue 实例创建前被调用，数据和模板均未获取到
                console.log('beforeCreate', this.$el, this.$data)
            },
            created() {
                // Vue实例创建后，最早可以获取到data数据的钩子，但是模板未获取到
                console.log('created', this.$el, this.$data)
            },
            beforeMount() {
                // 数据挂载之前，获取到了模板，但是数据还未挂载到模板上
                console.log('beforeMount', this.$el, this.$data)
            },
            mounted() {
                // 数据挂载之后
                console.log('mounted', this.$el, this.$data)
            },
            beforeUpdate() {
                // 当 data 数据更新之后，去更新模板中的数据前调用
                console.log('beforeUpdate', this.$el.innerHTML, this.$data)
            },
            updated() {
                console.log('updated', this.$el.innerHTML, this.$data)   
            },
            beforeDestroy() {
                // 销毁 Vue 之前调用
                // 首位工作
                console.log('beforeDstroy()')
            },
            destroyed() {
                // 销毁 Vue 之前调用
                console.log('destroyed()')
            }
        }).$mount('#app') // 如果实例中没有 el 选项，可使用 $mount() 手动挂载 Dom

        /* vm.$destroy()  */// 销毁Vue实例
    </script>
</body>
</html>
```

## 7.3 Vue中常用的ajax库

### 7.3.1 vue-resource

- 在vue1.x版本中，被广泛使用的非官方Vue插件`vue-resource`
    

### 7.3.2 axios

- 在vue2+版本中，官方推荐使用的非常棒的ajax请求库
    ==使用：结合生命钩子获取数据，渲染数据==
    

## 7.4 vue-resource的使用

自行百度

## 7.5 aios的使用

### 7.5.1 项目地址

[axios项目地址](https://github.com/axios/axios#readme "点击进入GitHub#README")

### 7.5.2 使用方法

1.  引入axios: `npm install axios`
2.  AppHome.js和emp.json中代码示例:

```javascript
window.AppHome = {
        template,
        data() {
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [

                ]
            }
        },
        created() {
            axios.get('http://127.0.0.1:5500/vue-07-lifecycle&ajx/04-bootstrap-ajax/emp.json')
                .then( response => {
                    // handle success
                    console.log(response.data, this)
                    this.empList = response.data
                })
                .catch( error => {
                    // handle error
                    console.log(error.message)
                    alert(error.message)
                })
        }
```

```json
[
    {"id": 1, "name":" 小梦1", "salary": "80001"},
    {"id": 2, "name":" 小梦2", "salary": "80002"},
    {"id": 3, "name":" 小梦3", "salary": "80003"},
    {"id": 4, "name":" 小梦4", "salary": "80004"}
]
```

## 8.1 什么是路由

Vue Router是Vue.js官方的路由管理器。它和Vue.js核心深度集成，让构建单页面应用变得非常简单。通过根据不同的请求路径，切换显示不同组件进行渲染页面。

### 8.1.1 安装路由

`npm install vue-router`

### 8.1.2 引入vue-router.js

```javascript
<script src="./node_modules/vue/dist/vue.js"</script>
<script src="./node_modules/vue-router/dist/vue-router.js"></script>
```

### 8.1.3 基本路由使用-示例代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>路由管理</title>
</head>

<body>
    <div id="app">
        <div class="header">
            <h1>头部</h1>
        </div>
        <div class="left">
            <p>
            <ul>
                <li><a href="#/foo">Go Foo</a></li>
                <li><a href="#/bar">Go Bar</a></li>
                <!-- 下面是官方推荐的写法 -->
                <!-- 
                    通过 router-link 标签会默认渲染出 a 标签
                    其中通过 to 属性指定跳转链接，不用带上 # 号
                -->
                <li><router-link to="/foo">Go to Foo</router-link><br/></li>
                <li><router-link to="/bar">Go to Bar</router-link></li>
            </ul>
            </p>
        </div>
        <div class="main">
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </div>
    </div>

    <script src="./node_modules/vue/dist/vue.js"></script>
    <script src="./node_modules/vue-router/dist/vue-router.js"></script>
    <script>
        // 1. 定义组件
        const Foo = {
            template: '<div>我是Foo组件</div>'
        }
        const Bar = {
            template: '<div>我是Bar组件</div>'
        }

        // 2. 配置路由表，当点击指定url时，显示对应的那个组件
        const router = new VueRouter({
            routes: [ // 注意单词是routes!
                { path: '/foo', component: Foo },
                { path: '/bar', component: Bar }
            ]
        })

        // 3. 将路由器注入到实例中
        new Vue({
            el: '#app',
            router // router: router
        })
    </script>
</body>

</html>
```
<br/>

## 8.2 新闻管理和个人中心实战

###  8.2.1 添加路由

1.  引入vue和vue-router
2.  配置路由表: 建立`router.js`，path和component可以写好
3.  将路由器注入`main.js`
4.  建立两个模块: `News.js`和`About.js`。这两个模块对应位置在`AppHome.js`的位置上，通过路由来切换。而`AppHome`的父组件是`App.js`。故路由出口在`App.js`里，里面写入`<router-view></router-view`
5.  设置路由跳转: `AppLeaf.js`是网站左边的菜单，可以在此处设置路由跳转。格式是: `<router-link to="/">首页</router-link>、<router-link to="/news">新闻管理</router-link>...`这样，当点击时，会映射路由表中的`path`，从而找到对应的组件(component)

###  8.2.2 添加路由代码
```javascript
==router.js==
;(function () {
    window.router = new VueRouter({
        routes: [
            {
                path: '/',
                component: AppHome
            },
            {
                path: '/news',
                component: News
            },
            {
                path: '/about',
                component: About
            }
        ]
    })
})()
```

```javascript
==main.js==
; (function () {
  new Vue({
    el: '#app',
    router,
    // Vue实例中的template选项中引用了组件后，会将这个组件的渲染结果替换掉 #app 标签的元素
    // template: '<app/>'是简写
    template: '<app></app>',  // 替换上面的app组件
    components: {
      App  // 等价于App: App
    }
  })
})()
```

```javascript
==News.js==
;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills">
          <li class="active"><a href="#">体育</a></li>
          <li ><a href="#">科技</a></li>
        </ul>
      </nav>
      <hr>
    </div>
    
    <!--体育栏目-->
  <div>
      <ul>
          <li>
              <a href="#">世界杯开赛啦</a>
          </li>
          <li>
              <a href="#">NBA开赛倒计时</a>
          </li>
      </ul>
      <!--详情-->
      <div class="jumbotron">
          <h2>世界杯开赛啦</h2>
          <p>世界杯于明晚8点举行开幕式.....</p>
      </div>
  </div>  
    <!--科技栏目-->
  <div>
      <ul >
          <li>
              <span>5G时代到来了 </span>
              <button class="btn  btn-default btn-xs">查看(Push)</button>&nbsp;
              <button class="btn btn-default btn-xs">查看(replace)</button>
          </li>
          <li>
              <span>互联网大洗牌</span>
              <button class="btn  btn-default btn-xs">查看(Push)</button>&nbsp;
              <button class="btn  btn-default btn-xs">查看(replace)</button>
          </li>
      </ul>
      <!--详情-->
      <div class="jumbotron">
          <h2>世界杯开赛啦</h2>
          <p>世界杯于明晚8点举行开幕式.....</p>
      </div>
  </div>		 
</div>`

window.News = {
    template
}
})()
```

```javascript
==About.js==
;(function () {
    const template = `
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h1>百度一下，你就知道</h1>
        <input type="text">
    </div>
    `

    window.About = {
        template
    }
})()
```

```javascript
==App.js==
 ;(function() {
    // 组件模板中，必须包含有且只有一个根元素
    const template = `<div id="#app">
        <!--头部导航区域-->
        <app-navbar></app-navbar>
    
    <!--核心区域:分左右两边-->
        <div class="container-fluid">
        <div class="row">
        
        <!--左边菜单栏区域-->
            <app-leaf></app-leaf>
        
        <!--右边主页面区域: 分上下两个区域
            <app-home>
                <h1 slot="dashboard" class="page-header">{{ title }}</h1>
            </app-home>
            -->
            <!-- 配置路由渲染组件出口 -->
            <router-view></router-view>
            </div>
        </div>
      </div>`

    window.App = {
        template,
        data: function () {
            return {
                title: '仪表盘'
            }
        },
        components: {
            AppNavbar,
            AppLeaf,
            AppHome
        }
    }
})()
```
<br/>

###  8.2.3 高亮样式匹配
#####  8.2.3.1 tag
- 类型`string`
- 默认值: `"a"

```html
<router-link to="/foo" tag="li">foo</router-link>
<!-- 渲染结果 -->
<li>foo</li>
```

#####  8.2.3.2 active-class
- 类型:`string`
- 默认值: `router-link-active`
- 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项`linkActiveClass`来全局配置。

作用: ==通过设置active-class属性，将之设置为`active`，就可以强调样式。==

```
==router.js==
/* 全局配置 router-link 标签生成的 CSS 类名 */
linkActiveClass: 'active'
```

产生了问题: `首页`始终高亮。
解决方法: 见8.3.4.3.3

#####  8.2.3.3 exact
- 类型: `boolean`
- 默认值: `false`

示例：
```javascript
<!-- 
	1. 这个链接只会在 地址为 / 的时候被激活
	2. 当没有exact属性时，为模糊匹配。例如<router-link to="/news">时，会匹配 / 和 /news 两个标签
-->
<router-link to="/" exact>
```
<br/>

##  8.3 嵌套路由
###  8.3.1 路由管理步骤与一些问题
1. 从`News.js`中抽取`Sport.js`和`Tech.js`
2. 配置子路由，从`/news`路径中分出子路由`children: [{path: xxx,component: xxx},{path: xxx,component: xxx}]`
3. 设置路由出口与跳转，在`News.js`中处渲染`<router-view>`，其上面使用`<router-link to="/news/sport" tag="li"><a>体育</a></router-link>`
4. 问题：新闻管理中，体育和科技刚开始默认不会显示。解决方法：children中添加：`path: '', redirect: '/news/sport'`
<br/>

###  8.3.2 缓存路由组件
> `关于我们`中，文本框内的内容无法缓存。

解决方法：`<keep-alive>`可缓存渲染的路由组件。

```javascript
==App.js==
<!-- 配置路由渲染组件出口 -->
            <keep-alive>
                <router-view>
                    <h1 slot="dashboard" class="page-header">{{ title }}</h1>
                </router-view>
            </keep-alive>
```
<br/>

##  8.4 路由组件传递数据
1. 路由配置
```javascript
{
	path: '/news/Sport',
	component: Sport,
	children: {
		path: '/news/sport/detail/:id',
		component: SportDetail
	}
}
```

2. 路由跳转路径
```javascript
<!--
	要动态拼接值，则 to 属性值是 JS 表达式，
	要写 JS 表达式，则要使用 v-bind 方式绑定属性
	注意 + 前面有单引号 ''
-->
<router-link :to="'./news/sport/detail/' + sport.id">
	{{sport.title}}
</router-link>
```

3. 在路由组件中读取请求参数
```javascript
this.$route.params.id
```
<br/>

###  8.4.1 示例代码
```javascript
==router.js==
;(function () {
    window.router = new VueRouter({
        /* 全局配置 router-link 标签生成的 CSS 类名 */
        linkActiveClass: 'active',
        routes: [
            {
                path: '/',
                component: AppHome
            },
            {
                path: '/news',
                component: News,
                children: [
                    {
                        // 当匹配到 /news/sport 时，
                        // 组件 Sport 会被渲染在 News 组件中的 <router-view> 组件中
                        path: '/news/sport',
                        component: Sport,
                        children: [
                            {
                                path: '/news/sport/detail/:id',  // :id 是路径变量，占位符
                                component: SportDetail
                            }
                        ]
                    },
                    {
                        // 简写方式，等价于 /news/tech 路径，前面不要有 / ，有 / 就是根路径
                        path: 'tech',
                        component: Tech
                    },
                    {
                        // 默认选择的路径： /news 后面没有子路精时，redirect 就是重定向指定路径
                        path: '',
                        redirect: '/news/sport'
                    }
                ]
            },
            {
                path: '/about',
                component: About
            }
        ]
    })
})()
```

```javascript
==Sport.js==
;(function () {
    const template = `<!--体育栏目-->
    <div>
        <ul>
            <li v-for="sport in sportArr" :key="sport.id">
                <a href="#">{{ sport.title }}</a>
                <!-- 
                    注意：to后面是JS表达式，就需要使用v-bind绑定to属性，即:to
                    注意：单引号不要少了
                -->
                <router-link :to="'/news/sport/detail/' + sport.id">
                    {{ sport.title }}
                </router-link>
            </li>
        </ul>
        <!-- 详情 渲染出SportDetail组件 -->
        <router-view></router-view>
        </div>`

    window.Sport = {
        template,
        data() {
            return {
                sportArr: []
            }
        },
        // 异步获取数据
        created() {
            this.getSportArr()
        },
        methods: {
            getSportArr() {
                axios.get('http://127.0.0.1:5500/router_practice/02-bootstrap-ajax-router/db/sport.json')
                .then( response => {
                    this.sportArr = response.data
                })
                .catch( error => {
                    // handle error
                    console.log(error.message)
                    alert(error.message)
                })
            }
        }
    }
})()
```

```javascript
==SportDetail.js==
;(function () {
    const template = `<!--体育栏目-->
    <div>
        <ul>
            <li v-for="sport in sportArr" :key="sport.id">
                <a href="#">{{ sport.title }}</a>
                <!-- 
                    注意：to后面是JS表达式，就需要使用v-bind绑定to属性，即:to
                    注意：单引号不要少了
                -->
                <router-link :to="'/news/sport/detail/' + sport.id">
                    {{ sport.title }}
                </router-link>
            </li>
        </ul>
        <!-- 详情 渲染出SportDetail组件 -->
        <router-view></router-view>
        </div>`

    window.Sport = {
        template,
        data() {
            return {
                sportArr: []
            }
        },
        // 异步获取数据
        created() {
            this.getSportArr()
        },
        methods: {
            getSportArr() {
                axios.get('http://127.0.0.1:5500/router_practice/02-bootstrap-ajax-router/db/sport.json')
                .then( response => {
                    this.sportArr = response.data
                })
                .catch( error => {
                    // handle error
                    console.log(error.message)
                    alert(error.message)
                })
            }
        }
    }
})()
```
<br/>

###  8.4.2 SportDetail详情组件
> 点击`世界杯开赛啦`，再去vue中看`Anonymous Component`中可以看到`$route/params/id`

```javascript
==SportDetail.js==
;(function () {
    const template = `<div class="jumbotron">
    <h1>{{ id }}</h1>
    <h2>{{ sportDetail.title }}</h2>
    <p>{{ sportDetail.content }}</p>
</div>`

window.SportDetail = {
    template,
    data () {
        return { // data 只会初始化一次，后面点击之后就不会赋值
            id: null,
            sportDetail: {},
            sportArr: []
        }
    },
    // 上面id取null而不是id: this.$route.params.id的原因在此：
    // 必须要id改变才能调用watch监听器。故直接使用钩子函数，在初始化时就调用getRportById()函数
    created () {
        // 第一次初始化组件时，要调用函数进行获取id并查找数据
        this.getRportById ()
    },
    methods: {
        getRportById () {
            // 1. 获取路由地址中的 id 值
            this.id = this.$route.params.id - 0
            // 2. 获取所有的体育新闻
            axios.get('http://127.0.0.1:5500/router_practice/02-bootstrap-ajax-router/db/sport.json')
                .then( response => {
                    this.sportArr = response.data
                    // 3. 通过 id 获取指定的数据
                    // find 返回满足条件的 一条数据（对象）
                    /* this.sportArr.find(function (detail) { // 这是错误的
                        // this 如果要代表当前组件对象，则回调函数要是用箭头函数
                        return detail.id === this.id
                    }) */
                    this.sportDetail = this.sportArr.find(detail => {
                        // this 如果要代表当前组件对象，则回调函数要是用箭头函数
                        return detail.id === this.id
                    })
                })
                .catch( error => {
                    alert(error.message)
                })
        }
    },
    watch: { // watch 是对象，用于监听属性使用
        '$route': function () {
            this.getRportById()
        }
    }
}

})()

```
<br/>

##  8.5 编程式路由导航
###  8.5.1 声明式路由导航 API
| 声明式(直接通过`<a>`标签href指定链接跳转) | 编程式(采用js代码链接跳转，如localhost.href) |
| ------ | ------ |
| `<router-link :to="...">` | `router.push(...)` |
<br/>

###  8.5.2 编程式路由导航 API
```javascript
this.$router.push(path) // 相当于点击路由链接(后退1步，会返回当前路由界面)
this.$router.replace(path) // 用新路由替换当前路由(后退1步，不可返回到当前路由界面)
this.$router.back() // 后退回上一个记录路由
this.$router.go(n) // 参数 n 指定步数
this.$router.go(-1) // 后退回上一个记录路由
this.$router.go(1) // 向前进下一个记录路由
```
<br/>

####  8.5.2.1 编程式路由导航示例代码
```javascript
==Tech.js==
;(function () {
    const template = `<!--科技栏目-->
    <div>
        <ul>
            <li v-for="tech in techArr" :key="tech.id">
                <span>{{ tech.title }}</span>
                <button @click="pushTech(tech.id)" class="btn  btn-default btn-xs">查看(Push)</button>&nbsp;
                <button @click="replaceTech(tech.id)" class="btn btn-default btn-xs">查看(replace)</button>
            </li>
            <button @click="$router.back()">后退</button>
            <button @click="$router.go(-1)">后退</button>
            <button @click="$router.go(1)">前进</button>
        </ul>
        <!--详情-->
        <router-view></router-view>
    </div>`

    window.Tech = {
        template,
        data () {
            return {
                techArr: []
            }
        },
        created() {
            this.getTechArr()
        },
        methods: {
            pushTech (id) {
                // push 可后退回来
                this.$router.push(`/news/tech/detail/${id}`) // ES6新语法，不需要+号，只需要弄一个美元符号$即可
            },
            replaceTech (id) {
                // replace 不可后退回来
                this.$router.replace(`/news/tech/detail/${id}`)
            },
            getTechArr () {
                axios.get('http://127.0.0.1:5500/router_practice/02-bootstrap-ajax-router/db/tech.json')
                .then( response => {
                    this.techArr = response.data
                })
                .catch( error => {
                    alert(error.message)
                })
            }
        }
    }
})()
```

```javascript
==TechDetail.js==
;(function () {
    const template = `<div class="jumbotron">
    <h2>{{ techDetail.title }}</h2>
    <p>{{ techDetail.content }}</p>
</div>`

    window.TechDetail = {
        template,
        data () {
            return { // data 只会初始化一次，后面点击之后就不会赋值
                id: null,
                techDetail: {},
                techArr: []
            }
        },
        // 上面id取null而不是id: this.$route.params.id的原因在此：
        // 必须要id改变才能调用watch监听器。故直接使用钩子函数，在初始化时就调用getRportById()函数
        created () {
            // 第一次初始化组件时，要调用函数进行获取id并查找数据
            this.getTechById ()
        },
        methods: {
            getTechById () {
                // 1. 获取路由地址中的 id 值
                this.id = this.$route.params.id - 0
                // 2. 获取所有的体育新闻
                axios.get('http://127.0.0.1:5500/router_practice/02-bootstrap-ajax-router/db/tech.json')
                    .then( response => {
                        this.techArr = response.data
                        // 3. 通过 id 获取指定的数据
                        // find 返回满足条件的 一条数据（对象）
                        this.techDetail = this.techArr.find(detail => {
                            // this 如果要代表当前组件对象，则回调函数要是用箭头函数
                            return detail.id === this.id
                        })
                    })
                    .catch( error => {
                        alert(error.message)
                    })
            }
        },
        watch: { // watch 是对象，用于监听属性使用
            '$route': function () {
                this.getTechById()
            }
        }
    }
})()
```
