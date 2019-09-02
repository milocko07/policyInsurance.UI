import { Constants } from './../core/constants/Constants';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { LoginResponseModel } from '../models/security/login.response.model';

@Injectable()
export class LoginService {

    private readonly baseURL: string;
    private readonly securityUrl: string;
    public readonly constants: Constants;

    constructor(private readonly http: HttpService) {
        this.baseURL = Constants.baseURL;
        this.securityUrl = Constants.securityRoot;
    }

    // Calls the api to login the user.
    login(credentials: string): Observable<any>  {
        return this.http.post<string, LoginResponseModel>(`${this.baseURL}${this.securityUrl}`, credentials, new HttpParams());
    }
}
