
# 评分组件
 
  评分组件共有五种形式 分别为  基础形式，变色形式，图标改变形式，文字辅助形式，只读形式
  
  rateValue：初始化评分数，数值大于评分最大个数则算最大分数，只读形式下支持小数

  基础形式需传入：maxRateNum rateIcon rateInitColor rateSelColor
  rateIcon：{'off':'没选中图标','on':['选中的图标数组']}
  
  变色形式需传入：maxRateNum rateIcon rateInitColor rateSelColor rateNumChange
  rateSelColor：为一个色码数组 传一个颜色默认不变色：['红色','蓝色','白色']
  rateNumChange：为一个指定特定个数为一组的数组，每一组显示的颜色与rateSelColor一一对应（重要！！！！！） 不传值
  则根据rateSelColor长度均分变色。 如前面两个为一个变色 中间一个变色 最后两个变色则传：[2,1,2]
  
  图标改变形式：maxRateNum rateIcon rateInitColor rateSelColor rateNumChange
  rateIcon: 传入一个图标数组
  
  文字辅助形式：maxRateNum rateIcon rateInitColor rateSelColor rateText
  rateText：辅助文字为一个长度等于最大显示图标数的数组，内容为每个图标等级显示的辅助文字  重要！！！
  
  只读形式：maxRateNum rateIcon rateSelColor disabled rateValue showRateValue
  只读形式的分数显示与文字辅助显示的文字不一样，文字辅助显示的文字与图标个数一一对应，分数只显示一个，
  由showRateValue控制 

  通过 `npm install neu-mdp-rate` 下载至本地并开始使用

## 在你的模块中使用
   .module文件
 ```typescript

  // 导入组件模板
  import { MdpRateModule } from "neu-mdp-rate";

  @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      MdpRateModule
    ],

  })
  export class HomeModule {}

```
.ts文件
```typescript

  export class HomePage {
    rateIcon:any;
    rateSelColor:any;

    ngOnInit(){
      this.rateIcon = {'off':'star-outline','on':['star']}
      this.rateSelColor = ['#F7BA2A'];
    }

  }
```

```html
  <mdp-rate [rateIcon]="rateIcon" maxRateNum="5" [rateSelColor]="rateSelColor" rateValue="3"></mdp-rate>
```