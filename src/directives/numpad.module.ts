import { NgModule } from '@angular/core';
import { MdpNumpadComponentModule } from "../components/mdp-numpad.module";
import { NumpadDirective } from './numpad';
@NgModule({
	declarations: [NumpadDirective],
	imports: [MdpNumpadComponentModule],
	exports: [NumpadDirective]
})
export class DirectivesModule { }
