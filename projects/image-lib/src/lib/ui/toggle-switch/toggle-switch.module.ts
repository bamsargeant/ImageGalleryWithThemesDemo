import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitchComponent } from './toggle-switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToggleSwitchComponent],
  imports: [CommonModule, FormsModule],
  exports: [ToggleSwitchComponent],
})
export class ToggleSwitchModule {}
