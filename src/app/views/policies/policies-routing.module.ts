import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliciesComponent } from './policies.component';
import { PoliciesAssigmentComponent } from './policies.assigment.component';

const routes: Routes = [
    // {
    //   path: '',
    //   component: PoliciesComponent,
    //   data: {
    //     title: 'Policies'
    //   }
    // },
    // {
    //   path: '',
    //   component: PoliciesAssigmentComponent,
    //   data: {
    //     title: 'Assigments'
    //   }
    // }

    {
      path: '',
      data: {
        title: 'Policies'
      },
      children: [
        {
          path: '',
          redirectTo: 'policies'
        },
        {
          path: 'policies',
          component: PoliciesComponent,
          data: {
            title: 'Policies'
          }
        },
        {
          path: 'assigments',
          component: PoliciesAssigmentComponent,
          data: {
            title: 'Assigments'
          }
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule {}
