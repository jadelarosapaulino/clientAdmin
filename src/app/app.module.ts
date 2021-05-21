import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ToastrModule } from 'ngx-toastr';

const dbConfig: DBConfig  = {
  name: 'clientAdminDB',
  version: 3,
  objectStoresMeta: [{
    store: 'client',
    storeConfig: { keyPath: 'clientID', autoIncrement: true },
    storeSchema: [
      { name: 'nombre', keypath: 'nombre', options: { unique: false } },
      { name: 'apellido', keypath: 'apellido', options: { unique: false } },
      { name: 'telefono', keypath: 'telefono', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
    ]
  }, {
    // animals added in version 2
    store: 'address',
    storeConfig: { keyPath: 'addressID', autoIncrement: true },
    storeSchema: [
      { name: 'direccion', keypath: 'direccion', options: { unique: false } },
      { name: 'clientID', keypath: 'clientID', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientFormComponent,
    ClientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
