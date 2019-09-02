import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class QueryParametersService {
    private sessionToken: string;
    private culture: string;

    constructor() { }

    set SessionToken(sessionToken: string) {
        if (sessionToken) {
            this.sessionToken = sessionToken;
        }
    }

    get SessionToken(): string {
        return this.sessionToken;
    }

    set Culture(culture: string) {
        if (culture) {
            this.culture = culture;
        }
    }

    get Culture(): string {
        return this.culture;
    }
}
