import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PolicyService } from '../../services/policies.service';
import { PolicyResponseModel } from '../../models/policies/policy.response.model';
import { PolicyRequestModel } from '../../models/policies/policy.request.model';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'policies.component.html'
})
export class PoliciesComponent implements OnInit {

    public policyList: Array<PolicyResponseModel> = new Array<PolicyResponseModel>();
    public newPolicy: PolicyRequestModel = new PolicyRequestModel();
    public isCreating: boolean = false;

    constructor(private policyService: PolicyService) { }

    ngOnInit() {
       this.getPolicyList();
    }

    activateCreation(event: Event) {
        this.isCreating = true;
    }

    create(form: NgForm) {
        debugger;
        this.policyService.create(this.newPolicy).subscribe(response => {
            this.isCreating = false;
            this.getPolicyList();
        }, err => {
            console.log(err);
        });
    }

    private getPolicyList(): void{
        this.policyService.getList().subscribe(response => {
            this.policyList = (<Array<PolicyResponseModel>>response);
        }, err => {
            console.log(err);
        });
    }
}
