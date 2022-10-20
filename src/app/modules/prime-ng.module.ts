import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    CommonModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    TableModule,
    DialogModule,
    MenuModule,
    ToastModule,
    CalendarModule,
    MultiSelectModule,
    InputNumberModule
  ],
})
export class PrimeNgModule {}
