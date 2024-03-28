import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  btnAcao = "Cadastrar";
  btnTitulo = "Cadastrar Funcionário";
  constructor(private clienteService: ClienteService, private router: Router ) {
    
  }

  createCliente(cliente: ClienteModel) { 
        this.clienteService.CreateCliente(cliente).subscribe((data) => {
          this.router.navigate(['/']);
        });
  }

}
