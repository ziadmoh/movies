import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './prime-ng.module';
import { SystemPagesRoutingModule } from './system-pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from '../components/movies/movies.component';
import { CategoriesComponent } from '../components/categories/categories.component';


@NgModule({
  declarations: [
    MoviesComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    SystemPagesRoutingModule,
    ReactiveFormsModule
	],
  exports: [
    HttpClientModule,
    CommonModule,
    PrimeNgModule,
  ],
})
export class SystemPagesModule {}
