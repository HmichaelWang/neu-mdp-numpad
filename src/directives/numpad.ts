import { Directive, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver, HostListener, Input } from '@angular/core';
import { MdpNumpadComponent } from '../components/mdp-numpad';
import { Content } from 'ionic-angular';

/**
 * Generated class for the NumpadDirective directive.自定义数字键盘
 */
@Directive({
  selector: '[numpad]', // Attribute selector,
})
export class NumpadDirective {
  isShow: boolean = false;
  @Input() isInit: any = false;
  @Input() position: ViewContainerRef;
  @Input() content: Content;
  _vHeight: number = document.body.clientHeight;
  _topHeight: number = this._vHeight * 0.64;
  @HostListener("click", ["$event"])
  onClick(e) {
    this.el.nativeElement.localName === "ion-input" ? this.el.nativeElement.children[0].blur() :
      this.el.nativeElement.blur();

    //若当前输入框位置低于键盘  则向上滚动至键盘上方
    if (e.clientY + this.el.nativeElement.clientHeight > this._topHeight) {
      this.content.scrollTo(0, this.content.getContentDimensions().scrollTop + e.clientY + this.el.nativeElement.clientHeight - this._topHeight, 300);
    }

    !this.isShow && this.showNumPad();
  }

  constructor(private render: Renderer2, private numPadel: ElementRef, private el: ElementRef, private view: ViewContainerRef, private cfr: ComponentFactoryResolver) {
    console.log(el)
  }

  ngOnInit() {
    // setTimeout(()=>{
    //   this.el.nativeElement.focus();
    // },100)
    if (this.isInit === true || this.isInit === "true" || this.isInit === "") {
      this.showNumPad()
    }
  }

  /**
   * 唤起自定义虚拟键盘
   */
  showNumPad() {
    this.isShow = true;
    //加载虚拟键盘
    let comFac = this.cfr.resolveComponentFactory(MdpNumpadComponent);
    let newCom = this.position.createComponent(comFac);
    newCom.changeDetectorRef.detectChanges();

    //获取虚拟键盘dom
    let mdpNum = this.position.element.nativeElement.nextElementSibling;

    //获取虚拟键盘设置的值
    this.numPadel.nativeElement = mdpNum;
    let finalDv = this.numPadel.nativeElement.children[0];

    //监听虚拟键盘点击事件
    this.render.listen(mdpNum, 'click', ($event) => {
      if ($event.toElement.className === "backdrop" || finalDv.id === "getDone") {
        setTimeout(() => {
          this.position.clear();
        }, 300);
        this.isShow = false;
      } else {
        this.render.setAttribute(this.el.nativeElement, "value", finalDv.id);
      }
    })
  }

  ngAfterViewInit() {

  }

}


