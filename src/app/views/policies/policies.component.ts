import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PolicyService } from '../../services/policies.service';
import { PolicyResponseModel } from '../../models/policies/policy.response.model';

@Component({
  templateUrl: 'policies.component.html'
})
export class PoliciesComponent implements OnInit {

    public policyList: Array<PolicyResponseModel> = new Array<PolicyResponseModel>();
    public isCreating: boolean = false;

    constructor(private policyService: PolicyService) { }

    ngOnInit() {
        this.policyService.getList().subscribe(response => {
            this.policyList = (<Array<PolicyResponseModel>>response);
        }, err => {
            console.log(err);
        });
    }

    activateCreation(event: Event) {
        this.isCreating = true;
        console.log("ffsd")
    }

}
