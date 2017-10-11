
# 简单计算器数字键盘

 覆盖移动端自带键盘，数字键盘用于纯数字的输入和加减运算

 使用：

  数字虚拟键盘为指令型属性，在input标签中加入 numpad属性即可使用；
  键盘输入的值会在input标签的value属性中；
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

.HTML文件
```html
  <input numpad isInit type="text">
```