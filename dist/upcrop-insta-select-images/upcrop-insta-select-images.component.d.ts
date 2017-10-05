import { OnInit, EventEmitter } from '@angular/core';
import { UpcropInstaService } from '../upcrop-insta/upcrop-insta.service';
export declare class UpcropInstaSelectImagesComponent implements OnInit {
    private upcropInstaService;
    config: any;
    onSelectInstagramPicture: EventEmitter<{}>;
    onUnselectInstagramPicture: EventEmitter<{}>;
    load: boolean;
    count: any;
    nextPageId: any;
    instagramImages: any;
    uploadedImages: any;
    constructor(upcropInstaService: UpcropInstaService);
    ngOnInit(): void;
    /**
     * Get instagram images
     */
    getInstagramImages(): void;
    /**
     * Select picture
     * @param item
     */
    selectPicture(item: any): void;
    /**
     * Unselect picture
     * @param item
     */
    unselectPicture(item: any): void;
}
