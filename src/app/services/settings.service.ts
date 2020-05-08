import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';
import { first, filter } from 'rxjs/operators';

const SETTINGS_STORAGE_KEY = 'settings';

interface PropertyChange {
  property?: string;
  value?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  subject = new BehaviorSubject<PropertyChange>({});
  settings = {};
  saving = false;
  unsaved = false;

  constructor(private storage: StorageMap) {

    const emitAll = () => {
      Object.keys(this.settings).map(key => {
        this.emit(key, this.settings[key]);
      });
    };

    this.storage.get(SETTINGS_STORAGE_KEY).subscribe(settings => {
      try {
        this.settings = JSON.parse(settings + '');
      } catch (e) {}
      emitAll();
    });
  }

  get(prop) {
    return this.subject.pipe(filter(({property}) => property === prop));
  }

  set(property, value) {
    this.settings[property] = value;
    this.emit(property, value);
    this.save();
  }

  emit(property, value) {
    this.subject.next({ property, value });
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
