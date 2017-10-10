import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdpNumpadComponent } from './mdp-numpad';
@NgModule({
	declarations: [MdpNumpadComponent],
	imports: [
		IonicPageModule.forChild(MdpNumpadComponent),
	],
	exports: [MdpNumpadComponent]
})
export class MdpNumpadComponentModule { }
