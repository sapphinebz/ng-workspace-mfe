import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { from } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portal';
  vc = inject(ViewContainerRef);

  addComponent() {
    // from(import('mfe1/Component')).subscribe((m) => {
    //   this.vc.createComponent(m.AppComponent);
    // });

    from(
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'mfe1',
        exposedModule: './Component',
      })
    ).subscribe((m) => {
      this.vc.createComponent(m.AppComponent);
    });
  }
}
