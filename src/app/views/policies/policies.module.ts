import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PoliciesAssigmentComponent } from './policies.assigment.component';


@NgModule({
imports: [
    PoliciesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
],
declarations: [ PoliciesComponent, PoliciesAssigmentComponent ]
})
export class PoliciesModule { }