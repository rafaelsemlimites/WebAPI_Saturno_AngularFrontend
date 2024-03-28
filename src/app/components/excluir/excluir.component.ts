import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  inputdata: any;
  cliente!: ClienteModel;

  constructor(private clienteService: ClienteService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ExcluirComponent>
  ) { }


  ngOnInit(): void {
    this.inputdata = this.data;
    this.clienteService.GetCliente(this.inputdata.id).subscribe((data) => {
      this.cliente = data.dados;      
    })
  }

  Excluir() {
    this.clienteService.DeleteCliente(this.cliente.email).subscribe((data) => {
      this.ref.close();
      window.location.reload();
    });
  }

}
