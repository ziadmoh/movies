import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SystemInitialComponent } from './components/system-initial/system-initial.component';

const routes: Routes = [
	{
		path: '',
		redirectTo:'system',
    pathMatch:'full'
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'system',
		component: SystemInitialComponent,
		children: [
			{
				path: '',
				loadChildren: () => import( './modules/system-pages' ).then( m => m.SystemPagesModule )
			},
		],
    canActivate:[AuthGuard]
	},
	{
		path: '**',
		component: NotFoundComponent,
	}
];


@NgModule( {
	imports: [ RouterModule.forRoot( routes, { useHash: false, anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' } )],
	exports: [ RouterModule ]
} )

export class AppRoutingModule { }
