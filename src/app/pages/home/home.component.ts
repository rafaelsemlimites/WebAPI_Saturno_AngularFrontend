import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clientes: ClienteModel[] = [];
  clientesGeral: ClienteModel[] = [];
  colunas = ['Ativo', 'Nome', 'Email', 'Tipo', 'Acoes', 'Excluir'];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.GetClientes().subscribe((data) => {
      const dados = data.dados;

      dados.map((item) => {
        item.dataDeCriacao = moment(item.dataDeCriacao!).format('DD/MM/YYYY');
        item.dataDeAlteracao = moment(item.dataDeAlteracao!).format(
          'DD/MM/YYYY'
        );
      });
      console.log(dados);
      this.clientes = data.dados;
      this.clientesGeral = data.dados;
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.clientes = this.clientesGeral.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(value);
    });
  }
}
