import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ]
})

export class MaterialModule {}
