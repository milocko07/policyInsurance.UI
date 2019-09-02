import { Constants } from '../core/constants/Constants';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { PolicyResponseModel } from '../models/policies/policy.response.model';
import { PolicyRequestModel } from '../models/policies/policy.request.model';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class PolicyService {

    private readonly baseURL: string;
    private readonly policyRoot: string;
    public readonly constants: Constants;

    constructor(private readonly http: HttpService) {
        this.baseURL = Constants.baseURL;
        this.policyRoot = Constants.policyRoot;
    }

    getList(): Observable<any>  {
        return this.http.get<PolicyResponseModel>(`${this.baseURL}${this.policyRoot}`);
    }

    create(model: FormGroup): Observable<any>  {
        return this.http.post<FormGroup, PolicyResponseModel>(`${this.baseURL}${this.policyRoot}`, model);
    }

    update(model: FormGroup): Observable<any>  {
        return this.http.put<FormGroup, PolicyResponseModel>(`${this.baseURL}${this.policyRoot}`, model);
    }

    delete(id: number): Observable<any>  {
        return this.http.delete<number, string>(`${this.baseURL}${this.policyRoot}`, id);
    }
}
