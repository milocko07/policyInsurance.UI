import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PolicyService } from '../../services/policies.service';
import { PolicyResponseModel } from '../../models/policies/policy.response.model';
import { PolicyRequestModel } from '../../models/policies/policy.request.model';
import { NgForm, FormBuilder, FormGroup, Validators, ValidationErrors  } from '@angular/forms';

@Component({
  templateUrl: 'policies.component.html',
  styleUrls: ["./policies.component.css"]
})
export class PoliciesComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    public policyList: Array<PolicyResponseModel> = new Array<PolicyResponseModel>();
    public isCreating: boolean = false;
    public isEditing: boolean = false;

    constructor(private formBuilder: FormBuilder, private policyService: PolicyService) { }

    ngOnInit() {
       this.getPolicyList();

       this.registerForm = this.formBuilder.group({
            id: [],
            name: ['', Validators.required],
            description: [],
            opening: ['', Validators.required],
            coverage: ['', [Validators.required, Validators.maxLength(3)]],
            timeCoverage: ['', [Validators.required, Validators.maxLength(3)]],
            price: ['', [Validators.required, Validators.maxLength(12)]],
            type: ['', Validators.required],
            risk: ['', Validators.required],
        });
    }

    // contains the form controls.
    get f() {
        return this.registerForm.controls;
    }

    activateCreation(event: Event) {
        this.isCreating = true;
    }

    save() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if (+this.registerForm.value.risk === 4 && this.registerForm.value.coverage > 50) {
            this.registerForm.controls.coverage.setErrors({smallerThan: 50});
            return;
        }

        if (this.isCreating) {
            this.policyService.create(this.registerForm.value).subscribe(response => {
                this.isCreating = false;
                alert('Policy inserted successfully');
                this.getPolicyList();
            }, err => {
                alert('Error happened');
                console.log(err);
            });
        } else if (this.isEditing) {
            this.policyService.update(this.registerForm.value).subscribe(response => {
                this.isEditing = false;
                alert('Policy updated successfully');
                this.getPolicyList();
            }, err => {
                alert('Error happened');
                console.log(err);
            });
        }
    }

    enableEdition(id: number): void {
        const policyToEdit: PolicyResponseModel = this.policyList.filter(p => p.id === id)[0];
        this.registerForm.controls.id.setValue(policyToEdit.id);
        this.registerForm.controls.name.setValue(policyToEdit.name);
        this.registerForm.controls.description.setValue(policyToEdit.description);
        this.registerForm.controls.opening.setValue(new Date(policyToEdit.opening).toISOString().substring(0, 10));
        this.registerForm.controls.coverage.setValue(policyToEdit.coverage);
        this.registerForm.controls.timeCoverage.setValue(policyToEdit.timeCoverage);
        this.registerForm.controls.price.setValue(policyToEdit.price);
        this.registerForm.controls.type.setValue(policyToEdit.typeId);
        this.registerForm.controls.risk.setValue(policyToEdit.riskId);
        this.isEditing = true;
    }

    remove(id: number): void {
        this.policyService.delete(id).subscribe(response => {
            this.isCreating = false;
            alert('Policy deleted successfully');
            this.getPolicyList();
        }, err => {
            alert('Error happened');
            console.log(err);
        });
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
