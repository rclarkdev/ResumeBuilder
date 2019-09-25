import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [    RouterModule.forRoot(  [
        { path: 'home', component: HomeComponent }
      ],
        )],
    exports: [RouterModule]
})

export class HomeRoutingModule { }