import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PluginOptions } from '../models/plugin-options';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor() {}

  lookUp(): Observable<PluginOptions[]> {
    return of([
      {
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Download',
        displayName: 'Download',
        componentName: 'DownloadComponent',
      },
      {
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Upload',
        displayName: 'Upload',
        componentName: 'UploadComponent',
      },
    ]);
  }
}
