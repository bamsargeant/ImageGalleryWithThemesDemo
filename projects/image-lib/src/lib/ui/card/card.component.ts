import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ImageInfo } from '../../models/image-info.model';

@Component({
  selector: 'img-lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() path: string = ''
  @Input() alttext: string = ''
  @Input() imgInfo: ImageInfo | undefined = undefined;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();
  onClick(e: any) {
    this.click.emit(e);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
