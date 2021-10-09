import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
