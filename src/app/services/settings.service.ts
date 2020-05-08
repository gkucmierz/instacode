import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { first, filter } from 'rxjs/operators';

const SETTINGS_STORAGE_KEY = 'settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  subject = new Subject<object>();
  settings = {};
  saving = false;
  unsaved = false;

  constructor(private storage: StorageMap) {

    this.storage.get(SETTINGS_STORAGE_KEY).subscribe(settings => {
      try {
        if (settings) {
          this.settings = JSON.parse(settings);
        }
        } catch (e) {}
    });
  }

  get(prop) {
    return this.subject.pipe(filter(({property}) => property === prop));
  }

  set(property, value) {
    this.settings[property] = value;
    this.subject.next({ property, value });
    this.save();
  }

  private save() {
    if (this.saving) {
      this.unsaved = true;
    } else {
      const data = JSON.stringify(this.settings);
      this.storage.set(SETTINGS_STORAGE_KEY, data)
        .pipe(first())
        .subscribe(() => {
            this.saving = false;
            if (this.unsaved) {
              this.save();
            }
            this.unsaved = false;
          });
      this.saving = true;
    }
  }

}
