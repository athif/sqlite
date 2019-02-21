import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChildPage } from '../child/child';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(HomePage),
    ],
    exports: [
        //  MyCustomComponentModule, // UPDATE: exporting the component is not necessary
        HomePage, ChildPage
    ]
})
export class HomePageModule { }