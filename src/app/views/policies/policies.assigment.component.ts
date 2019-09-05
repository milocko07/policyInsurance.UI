import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policies.service';
import { PolicyResponseModel } from '../../models/policies/policy.response.model';
import { PolicyAssigmentRequestModel } from '../../models/policies/policyAssigment.request.model';
import { NgForm, FormBuilder, FormGroup, Validators, ValidationErrors  } from '@angular/forms';

@Component({
  templateUrl: 'policies.assigment.component.html',
  styleUrls: ['./policies.assigment.component.css']
})
export class PoliciesAssigmentComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    public policyList: Array<PolicyResponseModel> = new Array<PolicyResponseModel>();
    public policyAssigmentRequest: PolicyAssigmentRequestModel = new PolicyAssigmentRequestModel();
    public isAssigning: boolean = false;
    public isCanceling: boolean = false;

    constructor(private formBuilder: FormBuilder, private policyService: PolicyService) { }

    ngOnInit() {
       this.getPolicyList();

       this.registerForm = this.formBuilder.group({
        clientId: ['', Validators.required],
        });

    }

    // contains the form controls.
    get f() {
        return this.registerForm.controls;
    }

    activateAssignation(id: number) {
        this.registerForm.controls.clientId.setValue('');
        this.policyAssigmentRequest.idPolicy = id;
        this.isAssigning = true;
        this.submitted = false;
    }

    activateCancelation(id: number) {
        this.registerForm.controls.clientId.setValue('');
        this.policyAssigmentRequest.idPolicy = id;
        this.isCanceling = true;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.policyAssigmentRequest.idClient = +this.registerForm.value.clientId;

        if (this.isAssigning) {
            this.policyService.assign(this.policyAssigmentRequest).subscribe(response => {
                this.isAssigning = false;
                alert('Client assigned successfully to the policy');
                this.getPolicyList();
            }, err => {
                alert('Error happened');
                console.log(err);
            });
        } else if (this.isCanceling) {
            this.policyService.cancel(this.policyAssigmentRequest).subscribe(response => {
                this.isCanceling = false;
                alert('Client cancelled successfully to the policy');
                this.getPolicyList();
            }, err => {
                alert('Error happened');
                console.log(err);
            });
        }
    }

    private getPolicyList(): void{
        this.policyService.getList().subscribe(response => {
            this.policyList = (<Array<PolicyResponseModel>>response);
        }, err => {
            alert('Error happened');
            console.log(err);
        });
    }
}
