import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MapRoutingModule } from './map-routing.module';
import { MapHomeComponent } from './map-home/map-home.component';

@NgModule({
  declarations: [MapHomeComponent],
  imports: [CommonModule, MapRoutingModule, HttpClientModule],
})
export class MapModule {}
