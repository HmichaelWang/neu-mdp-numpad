import { Component, EventEmitter } from '@angular/core';

/**
 * Generated class for the MdpNumpadComponent component.数字键盘组件
 */
@Component({
  selector: 'mdp-numpad',
  template: `
  <div [ngClass]="{'con num-pad-al':true,'md-show':showDom,'md-hide':hideDom}" [id]="padValue">
  <ion-grid class="border-grid" style="height:100%">
    <ion-row style="height:25%">
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('1')">1</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('2')">2</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('3')">3</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num ensure" (click)="padBack()">
          <ion-icon name="backspace"></ion-icon>
        </div>
      </ion-col>
    </ion-row>

    <ion-row style="height:25%">
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('4')">4</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('5')">5</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('6')">6</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padAdd()">+</div>
      </ion-col>
    </ion-row>

    <ion-row style="height:25%">
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('7')">7</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('8')">8</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('9')">9</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padSub()">-</div>
      </ion-col>
    </ion-row>

    <ion-row style="height:25%">
      <ion-col col-3>
        <div class="keyboard num ensure" (click)="padClear()">C</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('0')">0</div>
      </ion-col>
      <ion-col col-3>
        <div class="keyboard num" (click)="padClick('.')">.</div>
      </ion-col>
      <ion-col col-3>
          <button class="done" ion-button small mode="ios" (click)="padEnsure()">{{isDoneText}}</button>
      </ion-col>
    </ion-row>
  </ion-grid>

</div>
<div class="backdrop" (click)="closePad()"></div>`
})
export class MdpNumpadComponent {
  isDoneText: string = "完成"
  isDone: boolean = true;
  isDo: boolean = false;
  padValue: any = "";
  numList: Array<any> = [0, true, "n"];
  showDom: boolean = false;
  hideDom: boolean = false;

  constructor() {
    setTimeout(()=>{
      this.showDom = true;
    },10)
  }

  /**
   * 键盘数字点击
   * @param value 点击的数字
   */
  padClick(value) {
    this.numList[2] = "ys";
    if (this.isDo) {
      this.padValue = value;
      this.isDo = false;
    } else {
      this.padValue += value;
    }
  }

  /**
   * 回退事件
   */
  padBack() {
    this.padValue += "";
    this.padValue = this.padValue.substring(0, this.padValue.length - 1);
    this.padValue === "" ? this.padValue = "0" : false;
  }

  /**
   * 清除事件
   */
  padClear() {
    this.padValue = "";
    this.numList = [0, true, "n"];
    this.isDo = false;
  }

  /**
   * 加法
   */
  padAdd() {
    this.isDone = false;
    this.isDoneText = "=";
    this.numList[2] === "ys" && this.padEnsure(true);
    this.numList[0] = parseFloat(this.padValue) || 0;
    this.isDo = true;
    this.numList[1] = true;
  }

   /**
   * 减法
   */
  padSub() {
    this.isDone = false;
    this.isDoneText = "=";
    this.numList[2] === "ys" && this.padEnsure(true);
    this.numList[0] = parseFloat(this.padValue) || 0;
    this.isDo = true;
    this.numList[1] = false;
  }

   /**
   * 完成及等于
   */
  padEnsure(isYs) {
    if(this.isDone){
      this.padValue = "getDone";
      this.showDom = false;
      this.hideDom = true;
    }else{
      isYs ? false : this.isDone = true;
      isYs ? false : this.isDoneText = "完成";
      this.isDo = true;
      this.padValue === "" ? this.padValue = "0" : false;
      if (this.numList[2] === "ys") {
        this.padValue = this.numList[1] ? this.numList[0] + parseFloat(this.padValue) : this.numList[0] - parseFloat(this.padValue);
      } else {
        this.padValue = this.numList[1] = parseFloat(this.padValue);
      }
      this.numList[2] = "n";
    }
  }

   /**
   * 关闭弹窗
   */
  closePad(){
    this.showDom = false;
    this.hideDom = true;
  }

}
