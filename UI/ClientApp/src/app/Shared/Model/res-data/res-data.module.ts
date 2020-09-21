import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResDataModule { }
export interface ResDataModal {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [];
}
