import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
    selector: 'app-upcrop-insta-crop',
    templateUrl: './upcrop-insta-crop.component.html',
    styleUrls: ['./upcrop-insta-crop.component.scss']
})
export class UpcropInstaCropComponent implements OnInit {

    @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

    @Input()
    public config: any = {};

    @Input()
    public selectedInstagramPictures: any = [];

    @Output()
    public onCropImage = new EventEmitter();

    @Output()
    public onFinish = new EventEmitter();

    public uploading: any = false;
    public current: any = false;
    public currentNumber: any = false;


    /*--------  Constructor  --------*/


    constructor() { }


    /*--------  Hooks  --------*/


    ngOnInit() { }


    /*--------  Controller  --------*/


    /**
     * Set cropping and everything to start crop
     */
    setCropping() {

        // 
        // Disable cropping
        this.current = false;
        this.currentNumber = false;

        // 
        // Get next crop in the queue 
        this.goToNextCrop();
    }

    /**
     * Unset cropping
     */
    unsetCropping() {
        this.angularCropper.cropper.destroy();
        this.current = false;
    }

    /**
     * Go to next crop
     */
    goToNextCrop() {

        // 
        // Validate file
        if (!this.selectedInstagramPictures.length) return;

        // 
        // Update counter and file
        if (this.currentNumber === false) {
            this.currentNumber = 0;
        } else {

            this.emitOnCropImage();

            // 
            // Unset cropping
            this.unsetCropping();

            // 
            // Finish if is the last
            if (this.selectedInstagramPictures.length == (this.currentNumber + 1)) {
                this.onFinish.emit();
                return;
            } else {

                // 
                // Update counter
                this.currentNumber++;

            }
        }

        // 
        // Get next crop in the queue
        this.current = this.selectedInstagramPictures[this.currentNumber];
    }

    /**
     * Emit on crop image
     */
    emitOnCropImage() {

        // 
        // Add image data to current file
        this.onCropImage.emit({
            data: this.angularCropper.cropper.getData(),
            file: this.current.images.standard_resolution.url
        });
    }

    zoomIn() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.zoom(0.1);
    }

    zoomOut() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.zoom(-0.1);
    }

    goLeft() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(-10, 0);
    }

    goRight() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(10, 0);
    }

    goUp() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(0, -10);
    }

    goDown() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(0, 10);
    }

    rotateLeft() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.rotate(-45);
    }

    rotateRight() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.rotate(45);
    }

    reset() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.reset();
    }
}
