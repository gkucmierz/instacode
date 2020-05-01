import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scratchpad', component: ScratchpadComponent },
  { path: '', redirectTo: '/scratchpad', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
