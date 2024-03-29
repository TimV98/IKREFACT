import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from "./card/card.component";

@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent,
    CommonModule
  ],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
