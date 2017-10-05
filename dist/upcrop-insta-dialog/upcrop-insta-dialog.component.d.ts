import { OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { UpcropInstaCropComponent } from "../upcrop-insta-crop/upcrop-insta-crop.component";
export declare class UpcropInstaDialogComponent implements OnInit {
    dialogRef: MdDialogRef<UpcropInstaDialogComponent>;
    data: any;
    upcropCrop: UpcropInstaCropComponent;
    cropData: {};
    uploadedImages: any[];
    uploader: any;
    steps: any;
    constructor(dialogRef: MdDialogRef<UpcropInstaDialogComponent>, data: any);
    ngOnInit(): void;
    /**
     * Go to step 1
     */
    goToStep1(): void;
    /**
     * Go to step 2
     */
    goToStep2(): void;
    /**
     * Finish
     */
    finish(): void;
    /**
     * Step 1 next button disabled conditions
     */
    step1NextDisabled(): void;
    /**
     * On crop image event
     * @param event
     */
    onCropImage(event: any): void;
    /**
     * On upload image event
     * @param event
     */
    onUploadImage(event: any): void;
    /**
     * Create url params
     * @param obj
     */
    createUrlParams(obj: any): string;
}
