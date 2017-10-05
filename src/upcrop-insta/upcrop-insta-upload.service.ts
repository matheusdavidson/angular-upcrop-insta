import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, RequestMethod } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UpcropInstaUploadService {


    /*--------  Constructor  --------*/


    constructor(
        private http: Http
    ) { }


    /*--------  Methods  --------*/


    /**
     * Upload
     * @param model: Object<any>
     * @return Promise
     */
    public upload(url, file) {

        // 
        // Set headers
        let headersContent = { 'Content-Type': 'application/json' };

        // 
        // Set body and headers
        let body = JSON.stringify({ model: file });
        let headers = new Headers(headersContent);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .toPromise()
            .then((res) => {

                let data = res.json();

                // 
                // Reject promise
                return Promise.resolve(data);
            }).catch((err) => {

                // 
                // Reject promise
                return Promise.reject(err);
            });
    }
}
