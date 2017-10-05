import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UpcropInstaService } from '../upcrop-insta/upcrop-insta.service';

@Component({
    selector: 'app-upcrop-insta-select-images',
    templateUrl: './upcrop-insta-select-images.component.html',
    styleUrls: ['./upcrop-insta-select-images.component.scss'],
    providers: [UpcropInstaService]
})
export class UpcropInstaSelectImagesComponent implements OnInit {

    @Input()
    public config: any = {};

    @Output()
    public onSelectInstagramPicture = new EventEmitter();

    @Output()
    public onUnselectInstagramPicture = new EventEmitter();

    public load: boolean = false;
    public count: any = 3;
    public nextPageId: any = false;
    public instagramImages: any = [];
    public uploadedImages: any = [];


    /*--------  Constructor  --------*/


    constructor(
        private upcropInstaService: UpcropInstaService
    ) { }


    /*--------  Hooks  --------*/


    ngOnInit() {

        console.log('config', this.config);

        // 
        // Get user data
        this.config.authService.instagramGetUserData().then((data) => { });

        // 
        // Get pictures
        this.getInstagramImages();
    }


    /*--------  Methods  --------*/


    /**
     * Get instagram images
     */
    getInstagramImages() {

        // 
        // Set load
        this.load = true;

        this.upcropInstaService.getInstagramImages(this.config.authService.instagramAccessToken, this.count, this.nextPageId).then((res) => {

            // 
            // Validate data
            if (!res.data) return;

            // 
            // Concat instagram images
            this.instagramImages = this.instagramImages.concat(res.data);

            // 
            // Set next page id
            if (res.pagination && res.pagination.next_max_id)
                this.nextPageId = res.pagination.next_max_id;
            else
                this.nextPageId = false;

            // 
            // Unset load
            this.load = false;

        }).catch((err) => {

            // 
            // Unset load
            this.load = false;
        });
    }

    /**
     * Select picture
     * @param item 
     */
    selectPicture(item) {

        // 
        // Create identifier and select
        let now = Date.now();
        item.selected = now;

        // 
        // Emit file selection
        this.onSelectInstagramPicture.emit({
            data: item
        });
    }

    /**
     * Unselect picture
     * @param item 
     */
    unselectPicture(item) {

        // 
        // Emit file unselection
        this.onUnselectInstagramPicture.emit({
            data: item
        });

        // 
        // Remove selected
        delete item.selected;
    }
}
