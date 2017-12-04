import { Component, EventEmitter, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';

/**
 * Generated class for the MdpNumpadComponent component.数字键盘组件
 */
@Component({
    selector: 'mdp-numpad-pure',
    template: `
    <div [ngClass]="{'con num-pad-al':true,'md-show':showDom,'md-hide':hideDom}" [id]="padValue">
    <ion-grid #grid class="border-grid" style="height:100%">
        <ion-row>
            <ion-col col-3>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('1')">1</div>
                    </ion-col>
                </ion-row>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('4')">4</div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col col-3>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('2')">2</div>
                    </ion-col>
                </ion-row>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('5')">5</div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col col-3>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('3')">3</div>
                    </ion-col>
                </ion-row>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('6')">6</div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col col-3>
                <div tappable class="keyboard num ensure" (click)="padBack()">
                    <ion-icon name="backspace"></ion-icon>
                </div>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col col-3>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('7')">7</div>
                    </ion-col>
                </ion-row>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('.')">.</div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col col-6>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('8')">8</div>
                    </ion-col>
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('9')">9</div>
                    </ion-col>
                </ion-row>
                <ion-row class="H-5">
                    <ion-col>
                        <div tappable class="keyboard num" (click)="padClick('0')">0</div>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col col-3>
                <button tappable class="done" style="height:100%;font-size:larger" ion-button small mode="ios" (click)="padEnsure()">确定</button>
            </ion-col>
        </ion-row>
    </ion-grid>
</div>
<div tappable class="backdrop" (click)="closePad()"></div>`
})
export class MdpNumpadPureComponent implements OnInit {
    @ViewChild('grid') gridBox: ElementRef;
    isDone: boolean = true;
    padValue: any = "";
    showDom: boolean = false;
    hideDom: boolean = false;

    constructor(private renderer: Renderer2) {
        setTimeout(() => {
            this.showDom = true;
        }, 10)
    }

    ngOnInit() {
        let i = 0;
        let rowBox: ElementRef;
        let colBox: ElementRef;
        setTimeout(() => {
            let rowH = ((this.gridBox.nativeElement.clientHeight - 10) / 2) + 'px';
            for (rowBox of this.gridBox.nativeElement.children) {
                this.renderer.setStyle(rowBox, 'height', rowH)
                let rH = this.gridBox.nativeElement.children[i].children.length;
                for (let j = 0; j < rH; j++) {
                    this.renderer.setStyle(this.gridBox.nativeElement.children[i].children[j], 'height', '100%');
                    (j != rH - 1) && this.renderer.setStyle(this.gridBox.nativeElement.children[i].children[j], 'padding', '0');
                }

                // for(colBox of this.gridBox.nativeElement.children[i].children){
                //   this.renderer.setStyle(colBox,'height','100%');
                //   this.renderer.setStyle(colBox,'padding','0');
                // }
                i++;
            }
        }, 30)

    }

    /**
     * 键盘数字点击
     * @param value 点击的数字
     */
    padClick(value) {
        this.padValue += value;
    }

    /**
     * 回退事件
     */
    padBack() {
        this.padValue += "";
        this.padValue = this.padValue.substring(0, this.padValue.length - 1);
    }

    /**
    * 完成
    */
    padEnsure(isYs) {
        this.padValue = "getDone";
        this.showDom = false;
        this.hideDom = true;
    }

    /**
    * 关闭弹窗
    */
    closePad() {
        this.showDom = false;
        this.hideDom = true;
    }

}
