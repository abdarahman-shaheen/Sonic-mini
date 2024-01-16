// shared.module.ts
import { NgModule } from '@angular/core';
import { SearchPip } from './filter.pipe';

@NgModule({
  declarations: [SearchPip],
  exports: [SearchPip],
})
export class SharedModule {}
