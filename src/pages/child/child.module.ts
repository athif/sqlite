import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ChildPage } from './child';

@NgModule({
    declarations: [
        ChildPage,
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(ChildPage),
    ],
    exports: [
        //  MyCustomComponentModule, // UPDATE: exporting the component is not necessary
        ChildPage
    ]
})
export class ChildPageModule { }