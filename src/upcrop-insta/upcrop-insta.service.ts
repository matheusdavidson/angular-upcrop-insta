import { Injectable } from '@angular/core';
import { MdDialog } from "@angular/material";
import { UpcropInstaDialogComponent } from "../upcrop-insta-dialog/upcrop-insta-dialog.component";
import { Http, Headers, RequestOptions, URLSearchParams, RequestMethod, Request, Jsonp } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UpcropInstaService {

    public dialogConfig: any = {
        width: '80%',
        authService: false
    };
    public uploadConfig: any = {
        authService: false
    };
    public cropConfig: any = {
        movable: true,
        scalable: true,
        zoomable: true,
        viewMode: 1,
        autoCrop: true,
        autoCropArea: 1
    };


    /*--------  Constructor  --------*/


    constructor(
        public dialog: MdDialog,
        private jsonp: Jsonp
    ) { }


    /*--------  Methods  --------*/


    /**
     * Open dialog with uplaod & crop
     * @param {object} dialogConfig 
     * @param {object} uploadConfig 
     * @param {object} cropConfig 
     */
    open(
        dialogConfig: any = this.dialogConfig,
        uploadConfig: any = this.uploadConfig,
        cropConfig: any = this.cropConfig
    ) {

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
        return new Promise((resolve, reject) => {

            // 
            // Open confirmation dialog
            let dialogRef = this.dialog.open(UpcropInstaDialogComponent, this.dialogConfig);

            // 
            // Subscribe to on close event
            dialogRef.afterClosed().subscribe(result => {

                console.log('result', result);
                // 
                // Validate result
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }

    /**
     * Get instagram images
     */
    getInstagramImages(accessToken, count, maxId) {

        // 
        // Create url
        let url = 'https://api.instagram.com/v1/users/self/media/recent?access_token={ACCESS-TOKEN}&count={COUNT}&max_id={MAX-ID}&callback=JSONP_CALLBACK';

        // 
        // Replace access token, count and max id
        url = url.replace('{ACCESS-TOKEN}', accessToken);
        url = url.replace('{COUNT}', count);
        url = url.replace('{MAX-ID}', maxId);

        // 
        // Add headers
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
        })

        return this.jsonp.get(url, options).toPromise().then((res: any) => {

            // 
            // Json
            res = res.json();
            return Promise.resolve(res);

        }).catch((err) => {
            return Promise.reject(err);
        });
    }
}
