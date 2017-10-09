import { OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { UpcropInstaCropComponent } from "../upcrop-insta-crop/upcrop-insta-crop.component";
import { UpcropInstaUploadComponent } from '../upcrop-insta-upload/upcrop-insta-upload.component';
import { UpcropInstaUploadService } from '../upcrop-insta/upcrop-insta-upload.service';
export declare class UpcropInstaDialogComponent implements OnInit {
    dialogRef: MatDialogRef<UpcropInstaDialogComponent>;
    upcropInstaUploadService: UpcropInstaUploadService;
    data: any;
    upcropCrop: UpcropInstaCropComponent;
    upcropUpload: UpcropInstaUploadComponent;
    load: any;
    incSize: number;
    cropData: {};
    uploadedImages: any[];
    uploadQueue: any[];
    steps: any;
    selectedInstagramPictures: any;
    constructor(dialogRef: MatDialogRef<UpcropInstaDialogComponent>, upcropInstaUploadService: UpcropInstaUploadService, data: any);
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
     * On finish - Upload images
     */
    onFinish(): Promise<void>;
    /**
     * Upload image
     * @param image
     */
    uploadImage(image: any, mainResolve: any): Promise<{}>;
    /**
     * Upload next or return
     */
    uploadNextOrReturn(mainResolve: any, resolve: any): any;
    /**
     * Increase loading
     */
    increaseLoading(): void;
    /**
     * Create url params
     * @param obj
     */
    createUrlParams(obj: any): string;
    /**
     * On select picture
     * @param event
     */
    onSelectInstagramPicture(event: any): void;
    /**
     * On unselect picture
     * @param event
     */
    onUnselectInstagramPicture(event: any): void;
}
