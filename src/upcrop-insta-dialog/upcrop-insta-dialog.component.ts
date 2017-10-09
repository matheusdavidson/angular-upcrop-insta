import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UpcropInstaCropComponent } from "../upcrop-insta-crop/upcrop-insta-crop.component";
import { UpcropInstaUploadComponent } from '../upcrop-insta-upload/upcrop-insta-upload.component';
import { UpcropInstaUploadService } from '../upcrop-insta/upcrop-insta-upload.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-upcrop-dialog',
    templateUrl: './upcrop-insta-dialog.component.html',
    styleUrls: ['./upcrop-insta-dialog.component.scss'],
    providers: [UpcropInstaUploadService]
})
export class UpcropInstaDialogComponent implements OnInit {

    @ViewChild('upcropCrop') public upcropCrop: UpcropInstaCropComponent;
    @ViewChild('upcropUpload') public upcropUpload: UpcropInstaUploadComponent;

    public load: any = false;
    public incSize: number = 0;
    public cropData = {};
    public uploadedImages = [];
    public uploadQueue = [];
    public steps: any = {
        total: 2,
        options: [{
            label: 'Selecionar imagens',
            number: 1,
            next: 2,
            nextDisabled: () => { return this.step1NextDisabled(); },
            nextAction: () => { this.goToStep2(); }
        }, {
            label: 'Cortar imagens',
            number: 2,
            previus: 1,
            previusAction: () => { this.goToStep1(); }
        }],
        current: {}
    };
    public selectedInstagramPictures: any = [];


    /*--------  Constructor  --------*/


    constructor(
        public dialogRef: MatDialogRef<UpcropInstaDialogComponent>,
        public upcropInstaUploadService: UpcropInstaUploadService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


    /*--------  Hooks  --------*/


    ngOnInit() {

        // 
        // Set first step
        this.steps.current = this.steps.options[0];
    }


    /*--------  Controller  --------*/


    /**
     * Go to step 1
     */
    goToStep1() {

        // 
        // Reset crop
        this.upcropCrop.unsetCropping();

        // 
        // Change to step 1
        this.steps.current = this.steps.options[0];

        // 
        // Reset crop
        this.upcropCrop.current = false;
        this.upcropCrop.currentNumber = false;
    }

    /**
     * Go to step 2
     */
    goToStep2() {

        // 
        // Change to step 2
        this.steps.current = this.steps.options[1];

        // 
        // Set crop
        this.upcropCrop.setCropping();
    }

    /**
     * Finish
     */
    // finish() {

    // 
    // Upload images
    // this.upcropUpload.uploadedImages().then(() => {

    // }).catch(() => {

    // });

    // // 
    // // On complete all files uplaod
    // this.upcropUpload.uploader.onCompleteAll = () => {

    //     // 
    //     // Remove loading
    //     this.upcropCrop.uploading = false;

    //     // 
    //     // Close dialog with uploadedImages
    //     this.dialogRef.close(this.uploadedImages);
    // }

    // // 
    // // Emit on crop image
    // this.upcropCrop.emitOnCropImage();

    // // 
    // // Set crop data in additionalParameter
    // this.upcropUpload.uploader.options.additionalParameter['cropData'] = this.cropData;

    // // 
    // // Upload all
    // this.upcropCrop.uploading = true;
    // this.upcropUpload.uploader.uploadAll();
    // }

    /**
     * Step 1 next button disabled conditions
     */
    step1NextDisabled() {
        // return !this.upcropUpload.uploader.queue.length;
    }

    /**
     * On crop image event
     * @param event 
     */
    onCropImage(event) {

        // 
        // Add file
        event.data.file = event.file;

        // 
        // Push file to upload queue
        this.uploadQueue.push(event.data);
    }

    /**
     * On finish - Upload images
     */
    async onFinish() {

        // 
        // Start loading
        this.load = 1;

        // 
        // Find how much is the loading increment size
        this.incSize = 100 / this.uploadQueue.length;

        // 
        // Get first image
        let image = this.uploadQueue.shift();

        try {

            // 
            // Upload first image and all others sequentially
            await this.uploadImage(image, false);

            // 
            // Close dialog with uploadedImages
            this.dialogRef.close(this.uploadedImages);
        } catch (error) {

            // 
            // Close dialog with uploadedImages
            this.dialogRef.close(this.uploadedImages);
        }
    }

    /**
     * Upload image
     * @param image 
     */
    uploadImage(image, mainResolve) {
        return new Promise((resolve, reject) => {

            this.upcropInstaUploadService.upload(this.data.uploadConfig.url, image).then((uploaded: any) => {

                // 
                // Add data to uploadedImages
                this.uploadedImages.push(uploaded.image);

                // 
                // Upload next or return
                this.uploadNextOrReturn(mainResolve, resolve);

            }).catch(() => {

                // 
                // Upload next or return
                this.uploadNextOrReturn(mainResolve, resolve);
            });
        });
    }

    /**
     * Upload next or return
     */
    uploadNextOrReturn(mainResolve, resolve) {

        // 
        // Set resolve as mainResolve if not provided
        if (!mainResolve) mainResolve = resolve;

        // 
        // Increase loading
        this.increaseLoading();

        // 
        // Run next image or return
        if (!this.uploadQueue.length) {

            // 
            // Return mainResolve
            return mainResolve(true);
        } else {

            // 
            // Get next image
            let newImage = this.uploadQueue.shift();

            // 
            // Process new image
            this.uploadImage(newImage, mainResolve);
        }
    }

    /**
     * Increase loading
     */
    increaseLoading() {

        // 
        // Update load
        if (this.load == 1) {
            this.load = this.load + (this.incSize - 1);
        } else {
            this.load = this.load + this.incSize;
        }
    }

    /**
     * Create url params
     * @param obj 
     */
    createUrlParams(obj) {

        // 
        // Validate obj
        if (!obj) return '';

        // 
        // First param
        const url = '?';

        // 
        // Generate url param
        const params = Object.keys(obj).map(function (key) {
            return key + '=' + encodeURIComponent(obj[key]);
        }).join('&');

        return url + params;
    }

    /**
     * On select picture
     * @param event 
     */
    onSelectInstagramPicture(event) {

        // 
        // Push picture to array
        this.selectedInstagramPictures.push(event.data);
    }

    /**
     * On unselect picture
     * @param event 
     */
    onUnselectInstagramPicture(event) {

        // 
        // Remove picture from array
        _.remove(this.selectedInstagramPictures, (o) => {
            return o.selected == event.data.selected;
        });
    }
}
