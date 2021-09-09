import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultItemComponent implements OnInit {

  @Input()
  url: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
