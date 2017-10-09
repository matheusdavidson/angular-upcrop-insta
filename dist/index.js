import { Component, EventEmitter, Inject, Injectable, Input, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Headers, Http, HttpModule, Jsonp, JsonpModule, RequestMethod, RequestOptions } from '@angular/http';
import { MAT_DIALOG_DATA, MatButtonModule, MatCardModule, MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatTooltipModule } from '@angular/material';
import 'rxjs/add/operator/toPromise';
import { remove } from 'lodash';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularCropperjsModule } from 'angular-cropperjs';

var UpcropInstaUploadComponent = (function () {
    function UpcropInstaUploadComponent() {
        this.config = {};
        this.onUploadQueue = new EventEmitter();
        this.onUploadImage = new EventEmitter();
        this.onSelectInstagramPicture = new EventEmitter();
        this.onUnselectInstagramPicture = new EventEmitter();
    }
    /**
     * @return {?}
     */
    UpcropInstaUploadComponent.prototype.ngOnInit = function () {
        console.log('authService', this.config.authService);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    UpcropInstaUploadComponent.prototype.onSelectInstagramPictureProxy = function ($event) {
        this.onSelectInstagramPicture.emit($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    UpcropInstaUploadComponent.prototype.onUnselectInstagramPictureProxy = function ($event) {
        this.onUnselectInstagramPicture.emit($event);
    };
    return UpcropInstaUploadComponent;
}());
UpcropInstaUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-insta-upload',
                template: "<!-- MAIN LOAD --> <div main-loading [fxHide]=\"!config.authService.instagramLoginLoad\"> <div class=\"spinner\"></div> <br> <p>Aceite a permissão para logar com o instagram na outra janela que se abriu</p> </div> <div class=\"upcrop-insta-upload-container\" [fxHide]=\"config.authService.instagramLoginLoad\"> <!-- LOGIN WITH INSTAGRAM --> <div class=\"full-width\" *ngIf=\"!config.authService.instagramAccessToken\"> <p>Para iniciar, entre com o seu instagram:</p> <br> <button class=\"full-width\" md-raised-button color=\"accent\" (click)=\"config.authService.loginWithInstagram()\">Entrar no instagram</button> </div> <!-- SELECT IMAGES --> <app-upcrop-insta-select-images [config]=\"config\" (onSelectInstagramPicture)=\"onSelectInstagramPictureProxy($event)\" (onUnselectInstagramPicture)=\"onUnselectInstagramPictureProxy($event)\" *ngIf=\"config.authService.instagramAccessToken\"></app-upcrop-insta-select-images> </div>",
                styles: [".full-width { width: 100%; } [main-loading] { min-height: 120px; padding-top: 34px; box-sizing: border-box; flex-direction: column; max-width: 100%; place-content: center; align-items: center; display: flex; } .upcrop-insta-upload-container { width: 100%; padding: 16px 0; } "],
            },] },
];
/**
 * @nocollapse
 */
UpcropInstaUploadComponent.ctorParameters = function () { return []; };
UpcropInstaUploadComponent.propDecorators = {
    'config': [{ type: Input },],
    'onUploadQueue': [{ type: Output },],
    'onUploadImage': [{ type: Output },],
    'onSelectInstagramPicture': [{ type: Output },],
    'onUnselectInstagramPicture': [{ type: Output },],
};

var UpcropInstaUploadService = (function () {
    /**
     * @param {?} http
     */
    function UpcropInstaUploadService(http$$1) {
        this.http = http$$1;
    }
    /**
     * Upload
     * @param {?} url
     * @param {?} file
     * @return {?} Promise
     */
    UpcropInstaUploadService.prototype.upload = function (url, file) {
        // 
        // Set headers
        var /** @type {?} */ headersContent = { 'Content-Type': 'application/json' };
        // 
        // Set body and headers
        var /** @type {?} */ body = JSON.stringify({ model: file });
        var /** @type {?} */ headers = new Headers(headersContent);
        var /** @type {?} */ options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .toPromise()
            .then(function (res) {
            var /** @type {?} */ data = res.json();
            // 
            // Reject promise
            return Promise.resolve(data);
        }).catch(function (err) {
            // 
            // Reject promise
            return Promise.reject(err);
        });
    };
    return UpcropInstaUploadService;
}());
UpcropInstaUploadService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UpcropInstaUploadService.ctorParameters = function () { return [
    { type: Http, },
]; };

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UpcropInstaDialogComponent = (function () {
    /**
     * @param {?} dialogRef
     * @param {?} upcropInstaUploadService
     * @param {?} data
     */
    function UpcropInstaDialogComponent(dialogRef, upcropInstaUploadService, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.upcropInstaUploadService = upcropInstaUploadService;
        this.data = data;
        this.load = false;
        this.incSize = 0;
        this.cropData = {};
        this.uploadedImages = [];
        this.uploadQueue = [];
        this.steps = {
            total: 2,
            options: [{
                    label: 'Selecionar imagens',
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
        this.selectedInstagramPictures = [];
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
        this.upcropCrop.setCropping();
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
        // 
        // Add file
        event.data.file = event.file;
        // 
        // Push file to upload queue
        this.uploadQueue.push(event.data);
    };
    /**
     * On finish - Upload images
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.onFinish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var image, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 
                        // Start loading
                        this.load = 1;
                        // 
                        // Find how much is the loading increment size
                        this.incSize = 100 / this.uploadQueue.length;
                        image = this.uploadQueue.shift();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // 
                        // Upload first image and all others sequentially
                        return [4 /*yield*/, this.uploadImage(image, false)];
                    case 2:
                        // 
                        // Upload first image and all others sequentially
                        _a.sent();
                        // 
                        // Close dialog with uploadedImages
                        this.dialogRef.close(this.uploadedImages);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // 
                        // Close dialog with uploadedImages
                        this.dialogRef.close(this.uploadedImages);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Upload image
     * @param {?} image
     * @param {?} mainResolve
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.uploadImage = function (image, mainResolve) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.upcropInstaUploadService.upload(_this.data.uploadConfig.url, image).then(function (uploaded) {
                // 
                // Add data to uploadedImages
                _this.uploadedImages.push(uploaded.image);
                // 
                // Upload next or return
                _this.uploadNextOrReturn(mainResolve, resolve);
            }).catch(function () {
                // 
                // Upload next or return
                _this.uploadNextOrReturn(mainResolve, resolve);
            });
        });
    };
    /**
     * Upload next or return
     * @param {?} mainResolve
     * @param {?} resolve
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.uploadNextOrReturn = function (mainResolve, resolve) {
        // 
        // Set resolve as mainResolve if not provided
        if (!mainResolve)
            mainResolve = resolve;
        // 
        // Increase loading
        this.increaseLoading();
        // 
        // Run next image or return
        if (!this.uploadQueue.length) {
            // 
            // Return mainResolve
            return mainResolve(true);
        }
        else {
            // 
            // Get next image
            var /** @type {?} */ newImage = this.uploadQueue.shift();
            // 
            // Process new image
            this.uploadImage(newImage, mainResolve);
        }
    };
    /**
     * Increase loading
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.increaseLoading = function () {
        // 
        // Update load
        if (this.load == 1) {
            this.load = this.load + (this.incSize - 1);
        }
        else {
            this.load = this.load + this.incSize;
        }
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
    /**
     * On select picture
     * @param {?} event
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.onSelectInstagramPicture = function (event) {
        // 
        // Push picture to array
        this.selectedInstagramPictures.push(event.data);
    };
    /**
     * On unselect picture
     * @param {?} event
     * @return {?}
     */
    UpcropInstaDialogComponent.prototype.onUnselectInstagramPicture = function (event) {
        // 
        // Remove picture from array
        remove(this.selectedInstagramPictures, function (o) {
            return o.selected == event.data.selected;
        });
    };
    return UpcropInstaDialogComponent;
}());
UpcropInstaDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-dialog',
                template: "<h2 md-dialog-title class=\"has-text-danger\"> Imagens do instagram <small>com corte</small> </h2> <md-dialog-content> <!-- STEPS --> <div steps> <div steps-content fxLayout=\"row\" fxLayoutAlign=\"start center\"> <button md-icon-button fxHide.xs [disabled]=\"!steps.current.previus || (steps.current.previusDisabled && steps.current.previusDisabled())\" (click)=\"steps.current.previusAction()\"> <md-icon>keyboard_arrow_left</md-icon> </button> <span fxFlex></span> <h3>Passo <b>{{steps.current.number}}</b> de <b>{{steps.total}}</b> / <span class=\"has-text-primary\">{{steps.current.label}}</span> </h3> <span fxFlex></span> <button md-icon-button fxHide.xs [disabled]=\"!steps.current.next || (steps.current.nextDisabled && steps.current.nextDisabled())\" (click)=\"steps.current.nextAction()\"> <md-icon>keyboard_arrow_right</md-icon> </button> </div> </div> <!-- STEP 1 / UPLOAD --> <div class=\"step-1\" [hidden]=\"steps.current.number != 1\"> <app-upcrop-insta-upload #upcropUpload [config]=\"data.uploadConfig\" (onSelectInstagramPicture)=\"onSelectInstagramPicture($event)\" (onUnselectInstagramPicture)=\"onUnselectInstagramPicture($event)\" (onUploadImage)=\"onUploadImage($event)\"></app-upcrop-insta-upload> </div> <!-- STEP 2 / CROP --> <div class=\"step-2\" [hidden]=\"steps.current.number != 2\"> <app-upcrop-insta-crop #upcropCrop [selectedInstagramPictures]=\"selectedInstagramPictures\" [config]=\"data.cropConfig\" (onCropImage)=\"onCropImage($event)\" (onFinish)=\"onFinish()\"></app-upcrop-insta-crop> </div> <!-- MAIN LOAD --> <div main-loading [fxHide]=\"!load\"> <div class=\"spinner\"></div> <br> <p>Subindo images, progresso: {{load}}%</p> </div> </md-dialog-content> <md-dialog-actions *ngIf=\"steps.current.number == 1\"> <button md-button md-dialog-close>Fechar</button> <button md-button color=\"primary\" [disabled]=\"!selectedInstagramPictures.length\" (click)=\"goToStep2()\">Continuar</button> </md-dialog-actions> <md-dialog-actions *ngIf=\"steps.current.number == 2\"> <button md-button (click)=\"goToStep1()\">Voltar</button> <button md-button color=\"primary\" [fxHide]=\"upcropCrop.selectedInstagramPictures.length == (upcropCrop.currentNumber + 1)\" (click)=\"upcropCrop.goToNextCrop()\">Próxima imagem</button> <button md-button color=\"primary\" [fxHide]=\"upcropCrop.selectedInstagramPictures.length > (upcropCrop.currentNumber + 1)\" [disabled]=\"upcropCrop.uploading\" (click)=\"upcropCrop.goToNextCrop()\">Concluir</button> </md-dialog-actions>",
                styles: ["[md-dialog-title] small { color: #b5b5b5 !important; font: 400 16px/28px Roboto, \"Helvetica Neue\", sans-serif !important; margin: 0 0 16px !important; } [steps] { margin: 0 -24px; margin-top: 0px; margin-bottom: 16px; padding-top: 16px; padding-bottom: 16px; background-color: rgba(0, 0, 0, 0.04); } [steps] .has-text-primary { color: #3f51b5 !important; } [md-dialog-title] .has-text-danger { color: #f44336 !important; } [main-loading] { min-height: 120px; padding-top: 34px; box-sizing: border-box; flex-direction: column; max-width: 100%; place-content: center; align-items: center; display: flex; } "],
                providers: [UpcropInstaUploadService]
            },] },
];
/**
 * @nocollapse
 */
UpcropInstaDialogComponent.ctorParameters = function () { return [
    { type: MatDialogRef, },
    { type: UpcropInstaUploadService, },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
]; };
UpcropInstaDialogComponent.propDecorators = {
    'upcropCrop': [{ type: ViewChild, args: ['upcropCrop',] },],
    'upcropUpload': [{ type: ViewChild, args: ['upcropUpload',] },],
};

var UpcropInstaService = (function () {
    /**
     * @param {?} dialog
     * @param {?} jsonp
     */
    function UpcropInstaService(dialog, jsonp) {
        this.dialog = dialog;
        this.jsonp = jsonp;
        this.dialogConfig = {
            width: '80%',
            authService: false
        };
        this.uploadConfig = {
            authService: false
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
                console.log('result', result);
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
    /**
     * Get instagram images
     * @param {?} accessToken
     * @param {?} count
     * @param {?} maxId
     * @return {?}
     */
    UpcropInstaService.prototype.getInstagramImages = function (accessToken, count, maxId) {
        // 
        // Create url
        var /** @type {?} */ url = 'https://api.instagram.com/v1/users/self/media/recent?access_token={ACCESS-TOKEN}&count={COUNT}&max_id={MAX-ID}&callback=JSONP_CALLBACK';
        // 
        // Replace access token, count and max id
        url = url.replace('{ACCESS-TOKEN}', accessToken);
        url = url.replace('{COUNT}', count);
        url = url.replace('{MAX-ID}', maxId);
        // 
        // Add headers
        var /** @type {?} */ headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var /** @type {?} */ options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
        });
        return this.jsonp.get(url, options).toPromise().then(function (res) {
            // 
            // Json
            res = res.json();
            return Promise.resolve(res);
        }).catch(function (err) {
            return Promise.reject(err);
        });
    };
    return UpcropInstaService;
}());
UpcropInstaService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UpcropInstaService.ctorParameters = function () { return [
    { type: MatDialog, },
    { type: Jsonp, },
]; };

var UpcropInstaSelectImagesComponent = (function () {
    /**
     * @param {?} upcropInstaService
     */
    function UpcropInstaSelectImagesComponent(upcropInstaService) {
        this.upcropInstaService = upcropInstaService;
        this.config = {};
        this.onSelectInstagramPicture = new EventEmitter();
        this.onUnselectInstagramPicture = new EventEmitter();
        this.load = false;
        this.count = 3;
        this.nextPageId = false;
        this.instagramImages = [];
        this.uploadedImages = [];
    }
    /**
     * @return {?}
     */
    UpcropInstaSelectImagesComponent.prototype.ngOnInit = function () {
        console.log('config', this.config);
        // 
        // Get user data
        this.config.authService.instagramGetUserData().then(function (data) { });
        // 
        // Get pictures
        this.getInstagramImages();
    };
    /**
     * Get instagram images
     * @return {?}
     */
    UpcropInstaSelectImagesComponent.prototype.getInstagramImages = function () {
        var _this = this;
        // 
        // Set load
        this.load = true;
        this.upcropInstaService.getInstagramImages(this.config.authService.instagramAccessToken, this.count, this.nextPageId).then(function (res) {
            // 
            // Validate data
            if (!res.data)
                return;
            // 
            // Concat instagram images
            _this.instagramImages = _this.instagramImages.concat(res.data);
            // 
            // Set next page id
            if (res.pagination && res.pagination.next_max_id)
                _this.nextPageId = res.pagination.next_max_id;
            else
                _this.nextPageId = false;
            // 
            // Unset load
            _this.load = false;
        }).catch(function (err) {
            // 
            // Unset load
            _this.load = false;
        });
    };
    /**
     * Select picture
     * @param {?} item
     * @return {?}
     */
    UpcropInstaSelectImagesComponent.prototype.selectPicture = function (item) {
        // 
        // Create identifier and select
        var /** @type {?} */ now = Date.now();
        item.selected = now;
        // 
        // Emit file selection
        this.onSelectInstagramPicture.emit({
            data: item
        });
    };
    /**
     * Unselect picture
     * @param {?} item
     * @return {?}
     */
    UpcropInstaSelectImagesComponent.prototype.unselectPicture = function (item) {
        // 
        // Emit file unselection
        this.onUnselectInstagramPicture.emit({
            data: item
        });
        // 
        // Remove selected
        delete item.selected;
    };
    return UpcropInstaSelectImagesComponent;
}());
UpcropInstaSelectImagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-insta-select-images',
                template: "<!-- MAIN LOAD --> <div main-loading [fxHide]=\"!load || instagramImages.length\"> <div class=\"spinner\"></div> </div> <!-- NO ENTRIES --> <div no-entries [fxHide]=\"load || instagramImages.length\"> <div no-entries-content> <md-icon>texture</md-icon> <h1 class=\"mat-title\">Nenhuma imagem</h1> <h2 class=\"mat-subhead\">Nenhuma imagem para exibir no momento</h2> </div> </div> <!-- IMAGES --> <div class=\"images-list-items-container\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"16px\" fxLayoutWrap=\"none\" fxLayoutWrap.gt-xs> <md-card class=\"images-list-item\" [ngClass]=\"{'selected': item.selected}\" fxFlex=\"0 0 none\" fxFlex.gt-xs=\"0 0 calc(33.3333% - 16px)\" *ngFor=\"let item of instagramImages\"> <div class=\"card-background-image\" [style.backgroundImage]=\"'url('+ item.images.low_resolution.url +')'\"></div> <md-card-content> <p truncate>{{item.name}}</p> </md-card-content> <md-card-footer fxLayout> <button md-button fxFlex [fxHide]=\"item.selected\" (click)=\"selectPicture(item)\"> <md-icon>check_box_outline_blank</md-icon> Selecionar </button> <button class=\"has-text-success\" md-button fxFlex [fxHide]=\"!item.selected\" (click)=\"unselectPicture(item)\"> <md-icon>check</md-icon> Selecionado </button> </md-card-footer> </md-card> </div> <!-- LOAD MORE --> <div class=\"full-width\" [hidden]=\"nextPageId == false\"> <button class=\"full-width\" md-raised-button color=\"primary\" [ngClass]=\"{'is-loading': load}\" (click)=\"getInstagramImages()\">Carregar mais imagens</button> </div>",
                styles: [".full-width { width: 100%; } [main-loading] { min-height: 120px; padding-top: 34px; box-sizing: border-box; flex-direction: column; max-width: 100%; place-content: center; align-items: center; display: flex; } .upcrop-insta-upload-container { width: 100%; padding: 16px 0; } md-card-footer { border-top: 1px solid rgba(0, 0, 0, 0.1); } md-card-footer button { padding: 8px 0; } .images-list-items-container { margin-right: -16px; } @media (max-width: 599px) { .images-list-items-container { margin-right: 0px; } } .images-list-items-container [md-card-image] { cursor: pointer; } .images-list-item { opacity: .5; margin-bottom: 16px; } .images-list-item.selected { opacity: 1; } .card-background-image { min-width: 100%; height: 180px; margin: -24px -24px -16px; background-size: cover; background-repeat: no-repeat; background-position: center center; } @media (max-width: 600px) { .card-background-image { margin: -24px -16px -16px -16px; } } .mat-raised-button.is-loading:after { -webkit-animation: spinAround 500ms infinite linear; animation: spinAround 500ms infinite linear; border: 2px solid rgba(255, 255, 255, 0.7); border-radius: 50%; border-right-color: transparent; border-top-color: transparent; content: \"\"; display: block; height: 20px; position: relative; width: 20px; position: absolute; left: calc(50% - (20px / 2)); top: calc(50% - (20px / 2)); position: absolute !important; } .mat-raised-button.is-loading .mat-button-wrapper { visibility: hidden; } "],
                providers: [UpcropInstaService]
            },] },
];
/**
 * @nocollapse
 */
UpcropInstaSelectImagesComponent.ctorParameters = function () { return [
    { type: UpcropInstaService, },
]; };
UpcropInstaSelectImagesComponent.propDecorators = {
    'config': [{ type: Input },],
    'onSelectInstagramPicture': [{ type: Output },],
    'onUnselectInstagramPicture': [{ type: Output },],
};

var UpcropInstaCropComponent = (function () {
    function UpcropInstaCropComponent() {
        this.config = {};
        this.selectedInstagramPictures = [];
        this.onCropImage = new EventEmitter();
        this.onFinish = new EventEmitter();
        this.uploading = false;
        this.current = false;
        this.currentNumber = false;
    }
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.ngOnInit = function () { };
    /**
     * Set cropping and everything to start crop
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.setCropping = function () {
        // 
        // Disable cropping
        this.current = false;
        this.currentNumber = false;
        // 
        // Get next crop in the queue 
        this.goToNextCrop();
    };
    /**
     * Unset cropping
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.unsetCropping = function () {
        this.angularCropper.cropper.destroy();
        this.current = false;
    };
    /**
     * Go to next crop
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.goToNextCrop = function () {
        // 
        // Validate file
        if (!this.selectedInstagramPictures.length)
            return;
        // 
        // Update counter and file
        if (this.currentNumber === false) {
            this.currentNumber = 0;
        }
        else {
            this.emitOnCropImage();
            // 
            // Unset cropping
            this.unsetCropping();
            // 
            // Finish if is the last
            if (this.selectedInstagramPictures.length == (this.currentNumber + 1)) {
                this.onFinish.emit();
                return;
            }
            else {
                // 
                // Update counter
                this.currentNumber++;
            }
        }
        // 
        // Get next crop in the queue
        this.current = this.selectedInstagramPictures[this.currentNumber];
    };
    /**
     * Emit on crop image
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.emitOnCropImage = function () {
        // 
        // Add image data to current file
        this.onCropImage.emit({
            data: this.angularCropper.cropper.getData(),
            file: this.current.images.standard_resolution.url
        });
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.zoomIn = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.zoom(0.1);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.zoomOut = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.zoom(-0.1);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.goLeft = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(-10, 0);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.goRight = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(10, 0);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.goUp = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(0, -10);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.goDown = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(0, 10);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.rotateLeft = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.rotate(-45);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.rotateRight = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.rotate(45);
    };
    /**
     * @return {?}
     */
    UpcropInstaCropComponent.prototype.reset = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.reset();
    };
    return UpcropInstaCropComponent;
}());
UpcropInstaCropComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-insta-crop',
                template: "<!-- MAIN LOAD --> <div main-loading [fxHide]=\"!uploading\"> <div class=\"spinner\"></div> </div> <div [hidden]=\"uploading\" class=\"upcrop-crop\"> <h2 class=\"has-text-centered mat-subheading-2\">Imagem {{currentNumber + 1}} de {{selectedInstagramPictures.length}}</h2> <div class=\"crop-image-container\"> <angular-cropper #angularCropper *ngIf=\"current && current.images.standard_resolution.url\" [cropperOptions]=\"config\" [imageUrl]=\"current.images.standard_resolution.url\"></angular-cropper> </div> <!--CROPPER CONTROLS--> <div class=\"crop-controls\" fxLayout fxLayoutAlign=\"center center\" fxLayoutWrap *ngIf=\"current && current.images.standard_resolution.url\"> <button md-button (click)=\"zoomIn()\" class=\"md-icon-button\" aria-label=\"Aumentar zoom\" mdTooltip=\"Aumentar zoom\"> <md-icon>zoom_in</md-icon> </button> <button md-button (click)=\"zoomOut()\" class=\"md-icon-button\" aria-label=\"Diminuir zoom\" mdTooltip=\"Diminuir zoom\"> <md-icon>zoom_out</md-icon> </button> <button md-button (click)=\"goLeft()\" class=\"md-icon-button\" aria-label=\"Mover para esquerda\" mdTooltip=\"Mover para esquerda\"> <md-icon>keyboard_arrow_left</md-icon> </button> <button md-button (click)=\"goRight()\" class=\"md-icon-button\" aria-label=\"Mover para direita\" mdTooltip=\"Mover para direita\"> <md-icon>keyboard_arrow_right</md-icon> </button> <button md-button (click)=\"goUp()\" class=\"md-icon-button\" aria-label=\"Mover para cima\" mdTooltip=\"Mover para cima\"> <md-icon>keyboard_arrow_up</md-icon> </button> <button md-button (click)=\"goDown()\" class=\"md-icon-button\" aria-label=\"Mover para baixo\" mdTooltip=\"Mover para baixo\"> <md-icon>keyboard_arrow_down</md-icon> </button> <button md-button (click)=\"reset()\" class=\"md-icon-button md-primary\" aria-label=\"Restaurar imagem original\" mdTooltip=\"Restaurar imagem original\"> <md-icon>cached</md-icon> </button> </div> </div>",
                styles: [".crop-image-container { max-height: 500px; width: 100%; } .crop-image-container img { max-width: 100%; max-height: 100%; } .crop-controls { padding-top: 20px; padding-bottom: 20px; } .crop-controls .md-icon-button { min-width: auto !important; } [main-loading] { min-height: 120px; padding-top: 34px; box-sizing: border-box; flex-direction: column; max-width: 100%; place-content: center; align-items: center; display: flex; } .upcrop-crop .has-text-centered { text-align: center !important; } "]
            },] },
];
/**
 * @nocollapse
 */
UpcropInstaCropComponent.ctorParameters = function () { return []; };
UpcropInstaCropComponent.propDecorators = {
    'angularCropper': [{ type: ViewChild, args: ['angularCropper',] },],
    'config': [{ type: Input },],
    'selectedInstagramPictures': [{ type: Input },],
    'onCropImage': [{ type: Output },],
    'onFinish': [{ type: Output },],
};

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
    { type: NgModule, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
AngularUpcropInstaModule.ctorParameters = function () { return []; };

export { AngularUpcropInstaModule, UpcropInstaUploadComponent, UpcropInstaSelectImagesComponent, UpcropInstaCropComponent, UpcropInstaDialogComponent, UpcropInstaService, UpcropInstaUploadService };
