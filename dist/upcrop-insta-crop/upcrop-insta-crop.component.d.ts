import { OnInit, EventEmitter } from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';
export declare class UpcropInstaCropComponent implements OnInit {
    angularCropper: AngularCropperjsComponent;
    config: any;
    selectedInstagramPictures: any;
    onCropImage: EventEmitter<{}>;
    onFinish: EventEmitter<{}>;
    uploading: any;
    current: any;
    currentNumber: any;
    constructor();
    ngOnInit(): void;
    /**
     * Set cropping and everything to start crop
     */
    setCropping(): void;
    /**
     * Unset cropping
     */
    unsetCropping(): void;
    /**
     * Go to next crop
     */
    goToNextCrop(): void;
    /**
     * Emit on crop image
     */
    emitOnCropImage(): void;
    zoomIn(): void;
    zoomOut(): void;
    goLeft(): void;
    goRight(): void;
    goUp(): void;
    goDown(): void;
    rotateLeft(): void;
    rotateRight(): void;
    reset(): void;
}
