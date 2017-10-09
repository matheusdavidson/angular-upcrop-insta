import { MatDialog } from "@angular/material";
import { Jsonp, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
export declare class UpcropInstaService {
    dialog: MatDialog;
    jsonp: Jsonp;
    dialogConfig: any;
    uploadConfig: any;
    cropConfig: any;
    constructor(dialog: MatDialog, jsonp: Jsonp);
    /**
     * Open dialog with uplaod & crop
     * @param {object} dialogConfig
     * @param {object} uploadConfig
     * @param {object} cropConfig
     */
    open(dialogConfig?: any, uploadConfig?: any, cropConfig?: any): Promise<{}>;
    /**
     * Get instagram images
     */
    getInstagramImages(accessToken: any, count: any, maxId: any): Promise<Response>;
}
