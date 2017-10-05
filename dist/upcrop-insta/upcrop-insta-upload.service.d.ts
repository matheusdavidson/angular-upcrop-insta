import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
export declare class UpcropInstaUploadService {
    http: Http;
    constructor(http: Http);
    /**
     * Upload
     * @param model: Object<any>
     * @return Promise
     */
    upload(url: any, file: any): Promise<Response>;
}
