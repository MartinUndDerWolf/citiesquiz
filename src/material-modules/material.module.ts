import { NgModule } from '@angular/core';

import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  exports: [
    MatButtonModule,
    PlatformModule,
    PortalModule
  ],
  declarations: []
})

export class MaterialModules { }
