import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../components/categories/categories.component';
import { MoviesComponent } from '../components/movies/movies.component';




const routes: Routes = [         
  {path:'',redirectTo:'movies',pathMatch:'full' },
  {path:'movies',component:MoviesComponent},
  {path:'categories',component:CategoriesComponent},
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )

export class SystemPagesRoutingModule { };