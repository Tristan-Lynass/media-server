import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/component/app.component';
import { LoginGuardService } from 'src/app/component/login/login-guard.service';
import { LoginComponent } from 'src/app/component/login/login.component';
import { SearchComponent } from 'src/app/component/secure-area/search/search.component';
import { SecureAreaGuardService } from 'src/app/component/secure-area/secure-area-guard.service';
import { SecureAreaComponent } from 'src/app/component/secure-area/secure-area.component';
import { TagsComponent } from 'src/app/component/secure-area/tags/tags.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoginGuardService ]
  },
  {
    path: 'secure',
    component: SecureAreaComponent,
    canActivate: [ SecureAreaGuardService ],
    // canActivateChild: [ SecureAreaGuardService ], FIXME: Why doesn't this work?
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [ SecureAreaGuardService ]
      },
      {
        path: 'tags',
        component: TagsComponent,
        canActivate: [ SecureAreaGuardService ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'secure',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
