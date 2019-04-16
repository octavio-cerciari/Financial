import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfigComponent } from './config/config.component';
import { PayableComponent } from './payable/payable.component';
import { ChartsComponent } from './charts/charts.component';
import { GraphComponent } from './charts/graph/graph.component';
import {HttpClientModule} from '@angular/common/http';
import { ReleaseComponent } from './charts/release/release.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { GraphlineComponent } from './charts/graphline/graphline.component';
import { GraphbarComponent } from './charts/graphbar/graphbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConfigComponent,
    PayableComponent,
    ChartsComponent,
    GraphComponent,
    ReleaseComponent,
    DatepickerComponent,
    GraphlineComponent,
    GraphbarComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
