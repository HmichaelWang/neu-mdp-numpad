import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdpNumpadComponent } from './mdp-numpad';
import { MdpNumpadPureComponent } from './mdp-numpad-pure';
@NgModule({
	declarations: [MdpNumpadComponent,MdpNumpadPureComponent],
	imports: [
		IonicPageModule.forChild(MdpNumpadComponent),IonicPageModule.forChild(MdpNumpadPureComponent),
	],
	exports: [MdpNumpadComponent,MdpNumpadPureComponent]
})
export class MdpNumpadComponentModule { }
