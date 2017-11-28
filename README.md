
# 简单计算器数字键盘

 覆盖移动端自带键盘，数字键盘用于纯数字的输入和加减运算 键盘提供两种形式 包括带运算符的和纯数字的两种键盘；
 为了更好的适应所有的显示环境，本次更新调整了键盘显示方式，通过父组件传入制定的标签来容纳键盘

 使用：

  通过position熟悉传入键盘组件容器
  数字虚拟键盘为指令型属性，在input标签中加入 numpad属性即可使用；
  通过addCalc输入来选择键盘的类型 true：带计算的键盘  false：不带计算的键盘
  键盘输入的值需绑定在padModal中，作为用户值获取，与ngModal用法一致
  键盘输入的值也可以绑定在input标签的value属性中；
  默认只有input获得焦点时才唤起，通过添加isInit属性可以让页面加载时就初始化并唤起键盘

  完成按钮的主题颜色可通过修改ionic2默认主题色“primary”的颜色样式来修改;

  通过 `npm install neu-mdp-numpad` 下载至本地并开始使用
  

## 在你的模块中使用
 .module文件
 ```typescript
  import { DirectivesModule } from 'neu-mdp-numpad';

  @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      DirectivesModule
    ],

  })
  export class HomeModule {}

```
.ts文件
```ts
  import { ..., ViewContainerRef } from '@angular/core';

  export class NumpadPage {
  @ViewChild('componentPos',{read: ViewContainerRef}) pos:ViewContainerRef;

  constructor() {  }

```

.HTML文件
```html
  <ion-input numpad isInit [position]="pos" [addCalc]=true [value]="va" [(padModel)]="va" type="text" name="attachFiles" ></ion-input>

  <input numpad [position]="pos" type="text" name="expenseDate" [value]="va" [(ngModel)]="va">

  <section #componentPos></section>
```