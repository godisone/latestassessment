import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
  declarations: [ 
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'AppComponent', component:AppComponent}
    ],{ onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class AppRoutingModule { }
