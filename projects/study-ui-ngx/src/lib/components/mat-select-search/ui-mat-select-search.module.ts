import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatSelectMultipleComponent } from './mat-select-multiple.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // material
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  declarations: [
    SearchComponent,
    MatSelectMultipleComponent,
  ],
  entryComponents: [
    SearchComponent,
    MatSelectMultipleComponent,
  ],
  exports: [
    // SearchComponent,
    MatSelectMultipleComponent,
  ]
})
export class UiMatSelectSearchModule { }
