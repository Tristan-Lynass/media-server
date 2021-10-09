import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/component/app.component';
import { LoginGuardService } from 'src/app/component/login/login-guard.service';
import { LoginComponent } from 'src/app/component/login/login.component';
import { SearchComponent } from 'src/app/component/secure-area/search/search.component';
import { SecureAreaGuardService } from 'src/app/component/secure-area/secure-area-guard.service';
import { TagsComponent } from 'src/app/component/secure-area/tags/tags.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoginGuardService ]
  },
  {
    path: 'secure',
    component: AppComponent, // this is the component with the <router-outlet> in the template
    canActivate: [ SecureAreaGuardService ],
    children: [
      {
        path: 'search', // child route path
        component: SearchComponent // child route component that the router renders
      },
      {
        path: 'tags',
        component: TagsComponent // another child route component that the router renders
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
