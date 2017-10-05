import { OnInit, EventEmitter } from '@angular/core';
export declare class UpcropInstaUploadComponent implements OnInit {
    config: any;
    onUploadQueue: EventEmitter<{}>;
    onUploadImage: EventEmitter<{}>;
    onSelectInstagramPicture: EventEmitter<{}>;
    onUnselectInstagramPicture: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    onSelectInstagramPictureProxy($event: any): void;
    onUnselectInstagramPictureProxy($event: any): void;
}
