import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectGuard } from './redirect.guard';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', canActivate: [RedirectGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'scratchpad', component: ScratchpadComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: '' },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
