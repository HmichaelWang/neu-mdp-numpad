import { Directive, ElementRef, Renderer2, ViewContainerRef, ComponentFactoryResolver, HostListener, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { MdpNumpadComponent } from '../components/mdp-numpad';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Content } from 'ionic-angular';

/**
 * Generated class for the NumpadDirective directive.自定义数字键盘
 */

const CURRENCY_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumpadDirective),
  multi: true
}

@Directive({
  selector: '[numpad]',
  host: {
    '(change)': 'handleInput($event.target.value)',
  },
  providers: [CURRENCY_VALUE_ACCESSOR]
})
export class NumpadDirective implements ControlValueAccessor {
  onChange = (_: any) => { };
  onTouched = () => { };
  isShow: boolean = false;
  @Input() isInit: any = false;
  @Input() position: ViewContainerRef;
  @Input() content: Content;
  @Input('padModel') any;
  @Output('padModelChange') padModelChange: EventEmitter<number> = new EventEmitter<number>();
  inputElement: HTMLInputElement = null;
  _vHeight: number = document.body.clientHeight;
  _topHeight: number = this._vHeight * 0.64;
  @HostListener("click", ["$event"])
  onClick(e) {
    this.el.nativeElement.localName === "ion-input" ? this.el.nativeElement.children[0].blur() :
      this.el.nativeElement.blur();
    if (e.clientY + this.el.nativeElement.clientHeight > this._topHeight) {
      this.content.scrollTo(0, this.content.getContentDimensions().scrollTop + e.clientY + this.el.nativeElement.clientHeight - this._topHeight, 300);
    }
    !this.isShow && this.showNumPad();
  }

  constructor(private render: Renderer2, private numPadel: ElementRef, private el: ElementRef, private view: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let element = this.el.nativeElement;

    if (element.tagName === 'INPUT') {
      this.inputElement = element;
    }
    else {
      this.inputElement = element.getElementsByTagName('input')[0];
    }

    if (this.isInit === true || this.isInit === "true" || this.isInit === "") {
      this.showNumPad()
    }

  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; };

  registerOnTouched(fn: () => void): void { this.onTouched = fn; };

  writeValue(value: any): void { };

  handleInput(value: any) {
    this.padModelChange.next(value);
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
        this.onChange(finalDv.id);
        this.handleInput(finalDv.id);
        this.render.setProperty(this.inputElement, 'value', finalDv.id);
      }
    })
  }

}


