import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatSelectModule,
  MatNativeDateModule, MatIconModule, MatDialogModule, MatExpansionModule, MatListModule, MatToolbarModule,
  MatMenuModule, MatAutocompleteModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatGridListModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule, MAT_DATE_LOCALE, DateAdapter
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { CoreDateAdapterCustom } from 'study-core-ngx';

const MAT_ALL = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatOptionModule,
];

@NgModule({
  imports: [
    CommonModule,
    MAT_ALL
  ],
  exports: [
    MAT_ALL
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: CoreDateAdapterCustom },
  ]
})
export class MaterialModule {
}
