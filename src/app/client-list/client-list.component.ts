import { Component, OnInit } from '@angular/core';
import { clientModel } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList: clientModel[];
  constructor(public cs: ClientService) {
    this.clientList = [];
  }

  ngOnInit(): void {
    this.cs._getAll().subscribe(res => {
      this.clientList = res as clientModel[];
    })
  }

}
