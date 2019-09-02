import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PoliciesComponent } from './policies.component';
import { PoliciesRoutingModule } from './policies-routing.module';


@NgModule({
imports: [
    PoliciesRoutingModule,
    CommonModule,
    FormsModule
],
declarations: [ PoliciesComponent ]
})
export class PoliciesModule { }