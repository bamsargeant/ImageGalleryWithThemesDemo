import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'img-lib-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {
  @Input() checked: boolean = false;
  @Output() onCheck: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  changeChecked() {
    this.onCheck.emit(this.checked);
  }
}
