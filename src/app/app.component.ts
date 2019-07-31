import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Kalopsia';

  description = "Greek: (n.)The delusion of things being more beautiful than they really are.";

}
