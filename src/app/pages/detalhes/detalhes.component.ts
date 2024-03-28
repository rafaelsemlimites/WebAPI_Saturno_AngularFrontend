import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit {
  
  cliente?: ClienteModel;
  id!: number;
  
  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) { }
    
  
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.clienteService.GetCliente(this.id).subscribe((data) => { 
      
      const dados = data.dados;

      dados.dataDeCriacao = new Date(dados.dataDeCriacao!).toLocaleDateString('pt-BR');
      dados.dataDeAlteracao = new Date(dados.dataDeAlteracao!).toLocaleDateString('pt-BR');
      this.cliente = data.dados;
    })
  }

  InativaCliente() {
    this.clienteService.InativaCliente(this.id).subscribe((data) => {
      this.router.navigate(['']);
    })
  }
}
