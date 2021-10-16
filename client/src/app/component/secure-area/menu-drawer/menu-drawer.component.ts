import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDrawerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
