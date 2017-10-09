import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from "@angular/http";

import { UpcropInstaUploadComponent } from './upcrop-insta-upload/upcrop-insta-upload.component';
import { UpcropInstaSelectImagesComponent } from './upcrop-insta-select-images/upcrop-insta-select-images.component';
import { UpcropInstaCropComponent } from './upcrop-insta-crop/upcrop-insta-crop.component';
import { UpcropInstaDialogComponent } from './upcrop-insta-dialog/upcrop-insta-dialog.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule } from "@angular/material";
import { AngularCropperjsModule } from 'angular-cropperjs';

export * from './upcrop-insta-upload/upcrop-insta-upload.component';
export * from './upcrop-insta-select-images/upcrop-insta-select-images.component';
export * from './upcrop-insta-crop/upcrop-insta-crop.component';
export * from './upcrop-insta-dialog/upcrop-insta-dialog.component';
export * from './upcrop-insta/upcrop-insta.service';
export * from './upcrop-insta/upcrop-insta-upload.service';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
        AngularCropperjsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        UpcropInstaUploadComponent,
        UpcropInstaCropComponent,
        UpcropInstaDialogComponent,
        UpcropInstaSelectImagesComponent
    ],
    exports: [
        UpcropInstaUploadComponent,
        UpcropInstaCropComponent,
        UpcropInstaDialogComponent,
        UpcropInstaSelectImagesComponent,
        HttpModule,
        JsonpModule
    ],
    entryComponents: [UpcropInstaDialogComponent]
})
export class AngularUpcropInstaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularUpcropInstaModule
        };
    }
}