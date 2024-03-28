import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  btnAcao: string = 'Editar';
  btnTitulo: string = 'Editar Cliente';
  dadosCliente!: ClienteModel;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.GetCliente(id).subscribe((data) => {
      this.dadosCliente = data.dados;
    });
  }

  editarCliente(Cliente: ClienteModel) {
    this.clienteService.EditarCliente(Cliente).subscribe((data) => {
      this.router.navigate(['/']);
    });
  };
}
