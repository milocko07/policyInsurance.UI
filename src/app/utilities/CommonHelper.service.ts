import { Injectable, Injector } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Request, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MapUtils } from './MapUtils';

@Injectable()
export class CommonHelper {
    constructor() {

    }

    ConvertToModel<T>(response: Observable<Response>): Observable<T> {
        return response.map(data => <T>(data.json()));
    }

    ConvertToModelMapUtils<T>(clazz: { new (): T; }, response: Observable<Response>): Observable<T> {
        return response.map(data => MapUtils.deserialize(clazz, data.json()));
    }

    ConvertToModelMapUtilsAnyObject<T>(clazz: { new (): T; }, json: any): T {
        return MapUtils.deserialize(clazz, json);
    }
}