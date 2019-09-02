import { Constants } from '../core/constants/Constants';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { PolicyResponseModel } from '../models/policies/policy.response.model';
import { PolicyRequestModel } from '../models/policies/policy.request.model';

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

    create(model: PolicyRequestModel): Observable<any>  {
        return this.http.post<PolicyRequestModel, PolicyResponseModel>(`${this.baseURL}${this.policyRoot}`, model);
    }
}
