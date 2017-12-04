import { Component, EventEmitter, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';

/**
 * Generated class for the MdpNumpadComponent component.数字键盘组件 计算
 */
@Component({
  selector: 'mdp-numpad',
  template: `
  <div [ngClass]="{'con num-pad-al':true,'md-show':showDom,'md-hide':hideDom}" [id]="padValue">
  <ion-grid #grid class="border-grid" style="height:100%">
    <ion-row>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('1')">1</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('2')">2</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('3')">3</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num ensure" (click)="padBack()">
          <ion-icon name="backspace"></ion-icon>
        </div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('4')">4</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('5')">5</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('6')">6</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padAdd()">+</div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('7')">7</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('8')">8</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('9')">9</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padSub()">-</div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col col-3>
        <div tappable class="keyboard num ensure" (click)="padClear()">C</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('0')">0</div>
      </ion-col>
      <ion-col col-3>
        <div tappable class="keyboard num" (click)="padClick('.')">.</div>
      </ion-col>
      <ion-col col-3>
          <button tappable class="done" style="height:100%;font-size:larger" ion-button small mode="ios" (click)="padEnsure()">{{isDoneText}}</button>
      </ion-col>
    </ion-row>
  </ion-grid>

</div>
<div tappable class="backdrop" (click)="closePad()"></div>`
})
export class MdpNumpadComponent implements OnInit {
  @ViewChild('grid') gridBox: ElementRef;
  @ViewChild('row') rowBox: ElementRef;
  isDoneText: string = "完成"
  isDone: boolean = true;
  isDo: boolean = false;
  padValue: any = "";
  numList: Array<any> = [0, true, "n"];
  showDom: boolean = false;
  hideDom: boolean = false;

  constructor(private renderer: Renderer2) {
    setTimeout(() => {
      this.showDom = true;
    }, 10)
  }

  //设置单行高度
  ngOnInit() {
    let i = 0;
    let rowBox: ElementRef;
    let colBox: ElementRef;
    setTimeout(() => {
      let rowH = ((this.gridBox.nativeElement.clientHeight - 10) / 4) + 'px';
      for (rowBox of this.gridBox.nativeElement.children) {
        this.renderer.setStyle(rowBox, 'height', rowH)
        for (colBox of this.gridBox.nativeElement.children[i].children) {
          this.renderer.setStyle(colBox, 'height', '100%')
        }
        i++;
      }
    }, 30)

  }

  /**
   * 键盘数字点击
   * @param value 点击的数字
   */
  padClick(value) {
    let boxH = this.gridBox.nativeElement.clientHeight;
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
    this.numList[2] = "ys";
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
    this.numList[2] = "ys";
    this.isDo = true;
    this.numList[1] = false;
  }

  /**
  * 完成及等于
  */
  padEnsure(isYs) {
    if (this.isDone) {
      this.padValue = "getDone";
      this.showDom = false;
      this.hideDom = true;
    } else {
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
  closePad() {
    this.showDom = false;
    this.hideDom = true;
  }

}
