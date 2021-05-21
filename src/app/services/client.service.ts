import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { addressModel } from '../model/address';
import { clientModel } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private dbService: NgxIndexedDBService) { }

  _getAll() {
    return this.dbService.getAll('client');
  }

  _getCLient(id: number) {
    return this.dbService.getByID('client', id);
  }

  _add(data: clientModel) {
   return this.dbService
    .add('client', {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email
    });
  }

  _update(data: clientModel) {
    return this.dbService
     .update('client', {
       clientID: data.clientID,
       nombre: data.nombre,
       apellido: data.apellido,
       telefono: data.telefono,
       email: data.email
     });
   }

  //  Direcciones

  _getAllAddres(id: number) {
    return this.dbService.getAllByIndex('address', 'clientID', IDBKeyRange.only(id));
  }

   _getAddres(id: number) {
     return this.dbService
      .getByID('address', id)
   }

   _addAddress(data: addressModel) {
     return this.dbService
      .addItem('address',{
        direccion: data.direccion,
        clientID: data.clientID
      }
    )
   }
}
