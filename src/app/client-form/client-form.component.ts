import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addressModel } from '../model/address';
import { clientModel } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  formInfo: FormGroup;
  formAddress: FormGroup;
  clientInfo: clientModel;

  addressList: addressModel[];

  cID: number = 0;

  constructor(public cs: ClientService, private router: Router, private route: ActivatedRoute) {
    this.clientInfo = new clientModel;
    this.formInfo = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('')
    });

    this.formAddress = new FormGroup({
      addressID: new FormControl(null),
      direccion: new FormControl(''),
      clientID: new FormControl()
    });

    this.addressList = [];
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== null ) {
      this.cID = +id;

      this._getClient(this.cID)
    }
  }

  _getClient(id:number) {
    this.cs._getCLient(id).subscribe( res => {
      this.clientInfo = res as clientModel;

      this.formInfo.patchValue(
        {
          clientID: this.clientInfo.clientID,
          nombre: this.clientInfo.nombre,
          apellido: this.clientInfo.apellido,
          telefono: this.clientInfo.telefono,
          email: this.clientInfo.email
        }
        );

        this._getAllAddress();
    })
  }

  _addClient(data: clientModel) {
    this.cs._add(data).subscribe( res => {
      this.cs._getCLient(res).subscribe( dat => {
        console.log(dat);
      })
    })
  }

  _updateClient(data: clientModel) {
    const client = data as clientModel;

    this.cs._update(data).subscribe( res => {
      console.log(res);
    })
  }

  _addAdress(data: addressModel) {
    data.clientID = this.clientInfo.clientID;
    this.cs._addAddress(data)
      .subscribe(res => {
        console.log(res);
      })

  }

  _getAllAddress() {
    this.cs._getAllAddres(this.clientInfo.clientID).subscribe(res => {
      this.addressList = res as addressModel[];
    })
  }
}
