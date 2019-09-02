import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PoliciesComponent } from './policies.component';
import { PoliciesRoutingModule } from './policies-routing.module';


@NgModule({
imports: [
    PoliciesRoutingModule,
    CommonModule
],
declarations: [ PoliciesComponent ]
})
export class PoliciesModule { }