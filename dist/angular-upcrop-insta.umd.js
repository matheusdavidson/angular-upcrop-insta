(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material'), require('@angular/flex-layout'), require('angular-cropperjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/material', '@angular/flex-layout', 'angular-cropperjs'], factory) :
	(factory((global['angular-upcrop-insta'] = {}),global.core,global.common,global.material,global.flexLayout,global.angularCropperjs));
}(this, (function (exports,core,common,material,flexLayout,angularCropperjs) { 'use strict';

var UpcropInstaDialogComponent = (function () {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    function UpcropInstaDialogComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.cropData = {};
        this.uploadedImages = [];
        this.uploader = null;
        this.steps = {
            total: 2,
            options: [{
                    label: 'Subir imagens',
                    number: 1,
                    next: 2,
                    nextDisabled: function () { return _this.step1NextDisabled(); },
                    nextAction: function () { _this.goToStep2(); }
                }, {
                    label: 'Cortar imagens',
                    number: 2,
                    previus: 1,
                    previusAction: function () { _this.goToStep1(); }
                }],
            current: {}
        };
    }
    /**
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.ngOnInit = function () {
        // 
        // Set first step
        this.steps.current = this.steps.options[0];
    };
    /**
     * Go to step 1
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.goToStep1 = function () {
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
    };
    /**
     * Go to step 2
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.goToStep2 = function () {
        // 
        // Change to step 2
        this.steps.current = this.steps.options[1];
        // 
        // Set crop
        // this.upcropCrop.setCropping(this.upcropUpload.uploader);
    };
    /**
     * Finish
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.finish = function () {
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
    };
    /**
     * Step 1 next button disabled conditions
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.step1NextDisabled = function () {
        // return !this.upcropUpload.uploader.queue.length;
    };
    /**
     * On crop image event
     * @param {?} event
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.onCropImage = function (event) {
        // // 
        // // Create url params with crop data
        // const cropData = this.createUrlParams(event.data);
        // // 
        // // Add crop to uploader file crop data
        // this.upcropUpload.uploader.queue[event.file].url = this.data.uploadConfig.url + cropData;
    };
    /**
     * On upload image event
     * @param {?} event
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.onUploadImage = function (event) {
        this.uploadedImages.push(event.image);
    };
    /**
     * Create url params
     * @param {?} obj
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.createUrlParams = function (obj) {
        // 
        // Validate obj
        if (!obj)
            return '';
        // 
        // First param
        var /** @type {?} */ url = '?';
        // 
        // Generate url param
        var /** @type {?} */ params = Object.keys(obj).map(function (key) {
            return key + '=' + encodeURIComponent(obj[key]);
        }).join('&');
        return url + params;
    };
    return UpcropInstaDialogComponent;
}());
UpcropInstaDialogComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-upcrop-dialog',
                templateUrl: './upcrop-insta-dialog.component',
                styles: ['[md-dialog-title] small{color:#b5b5b5!important;font:400 16px/28px Roboto,"Helvetica Neue",sans-serif!important;margin:0 0 16px!important}[steps]{margin:0 -24px 16px;padding-top:16px;padding-bottom:16px;background-color:rgba(0,0,0,.04)}[steps] .has-text-primary{color:#3f51b5!important}[md-dialog-title] .has-text-danger{color:#f44336!important}']
            },] },
];
/**
 * @nocollapse
 */
UpcropInstaDialogComponent.ctorParameters = function () { return [
    { type: material.MdDialogRef, },
    { type: undefined, decorators: [{ type: core.Inject, args: [material.MD_DIALOG_DATA,] },] },
]; };
UpcropInstaDialogComponent.propDecorators = {
    'upcropCrop': [{ type: core.ViewChild, args: ['upcropCrop',] },],
};

var UpcropInstaService = (function () {
    /**
     * @param {?} dialog
     */
    function UpcropInstaService(dialog) {
        this.dialog = dialog;
        this.dialogConfig = {
            width: '80%'
        };
        this.uploadConfig = {
            url: null,
            authToken: null,
            autoUpload: false,
            additionalParameter: {},
            withCredentials: false
        };
        this.cropConfig = {
            movable: true,
            scalable: true,
            zoomable: true,
            viewMode: 1,
            autoCrop: true,
            autoCropArea: 1
        };
    }
    /**
     * Open dialog with uplaod & crop
     * @param {?=} dialogConfig
     * @param {?=} uploadConfig
     * @param {?=} cropConfig
     * @return {?}
     */
    UpcropInstaService.prototype.open = function (dialogConfig, uploadConfig, cropConfig) {
        var _this = this;
        if (dialogConfig === void 0) { dialogConfig = this.dialogConfig; }
        if (uploadConfig === void 0) { uploadConfig = this.uploadConfig; }
        if (cropConfig === void 0) { cropConfig = this.cropConfig; }
        // 
        // Merge config
        this.uploadConfig = Object.assign(this.uploadConfig, uploadConfig);
        this.cropConfig = Object.assign(this.cropConfig, cropConfig);
        this.dialogConfig = Object.assign({}, this.dialogConfig, dialogConfig, {
            data: {
                uploadConfig: this.uploadConfig,
                cropConfig: this.cropConfig
            }
        });
        // 
        // Create promise to return the dialog result
        return new Promise(function (resolve, reject) {
            // 
            // Open confirmation dialog
            var /** @type {?} */ dialogRef = _this.dialog.open(UpcropInstaDialogComponent, _this.dialogConfig);
            // 
            // Subscribe to on close event
            dialogRef.afterClosed().subscribe(function (result) {
                // 
                // Validate result
                if (result) {
                    resolve(result);
                }
                else {
                    reject();
                }
            });
        });
    };
    return UpcropInstaService;
}());
UpcropInstaService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
UpcropInstaService.ctorParameters = function () { return [
    { type: material.MdDialog, },
]; };

// import { UpcropUploadComponent } from './upcrop-upload/upcrop-upload.component';
// import { UpcropCropComponent } from './upcrop-crop/upcrop-crop.component';
var AngularUpcropInstaModule = (function () {
    function AngularUpcropInstaModule() {
    }
    /**
     * @return {?}
     */
    AngularUpcropInstaModule.forRoot = function () {
        return {
            ngModule: AngularUpcropInstaModule
        };
    };
    return AngularUpcropInstaModule;
}());
AngularUpcropInstaModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    flexLayout.FlexLayoutModule,
                    material.MdCardModule,
                    material.MdIconModule,
                    material.MdButtonModule,
                    material.MdDialogModule,
                    material.MdTooltipModule,
                    angularCropperjs.AngularCropperjsModule
                ],
                declarations: [
                    // UpcropUploadComponent,
                    // UpcropCropComponent,
                    UpcropInstaDialogComponent
                ],
                exports: [
                    // UpcropUploadComponent,
                    // UpcropCropComponent,
                    UpcropInstaDialogComponent
                ],
                entryComponents: [UpcropInstaDialogComponent]
            },] },
];
/**
 * @nocollapse
 */
AngularUpcropInstaModule.ctorParameters = function () { return []; };

exports.AngularUpcropInstaModule = AngularUpcropInstaModule;
exports.UpcropInstaDialogComponent = UpcropInstaDialogComponent;
exports.UpcropInstaService = UpcropInstaService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
