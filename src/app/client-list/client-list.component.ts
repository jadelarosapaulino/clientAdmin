import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { clientModel } from '../model/client';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  searchForm: FormGroup;

  clientList: clientModel[];
  constructor(public cs: ClientService, public toastr: ToastrService) {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    
    this.clientList = [];
  }

  ngOnInit(): void {
    this._getData();
  }

  _getData() {
    this.cs._getAll().subscribe(res => {
      this.clientList = res as clientModel[];
    });
  }

  _deleteCient(id: number) {
    this.cs._delete(id).subscribe( res => {
      this._getData();
    })
  }

  _searchClient() {
    this.clientList = [];
    const dat = this.searchForm.get('search')?.value;  
    
    dat.charAt(0).toUpperCase() + dat.substring(1);

    console.log(dat);
    

    this.cs._search(dat).subscribe( res => {
      let cl = res as clientModel;
      this.clientList.push(cl);   
    })
  }
}
