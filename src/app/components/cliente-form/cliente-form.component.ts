import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClienteModel } from 'src/app/models/ClienteModel';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  @Input() clienteForm!: FormGroup;
  @Output() onSubmit = new EventEmitter<ClienteModel>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosCliente: ClienteModel | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    

    this.clienteForm = this.fb.group({
      id: [this.dadosCliente ? this.dadosCliente.id : 0],
      nome: [this.dadosCliente ? this.dadosCliente.nome : '', Validators.required],
      email: [this.dadosCliente ? this.dadosCliente.email : '', Validators.required],
      telefones: this.fb.array(
        this.dadosCliente?.telefones
          ? this.dadosCliente.telefones.map((telefone) =>
              this.fb.group({
                ddd: [telefone.ddd],
                numero: [telefone.numero],
                tipo: [telefone.tipo],
              })
            )
          : []
      ), // Carrega os telefones se existirem
      tipoCliente: [
        this.dadosCliente ? this.dadosCliente.tipoCliente : '',
        Validators.required,
      ],
      ativo: [this.dadosCliente ? this.dadosCliente.ativo : true],
      dataDeCriacao: [
        this.dadosCliente?.dataDeCriacao
          ? this.dadosCliente.dataDeCriacao
          : new Date(),
      ],
      dataDeAlteracao: [
        this.dadosCliente?.dataDeAlteracao
          ? this.dadosCliente.dataDeAlteracao
          : new Date(),
      ],
    });
  }

  // Método para adicionar um novo controle de telefone ao FormArray
  adicionarTelefone(): void {
    const novoTelefone = this.fb.group({
      ddd: [''],
      numero: [''],
      tipo: [''],
      clienteId: [0],
    });

    this.telefones.push(novoTelefone);
  }

  // Getter conveniente para acessar o FormArray de telefones
  get telefones(): FormArray {
    return this.clienteForm.get('telefones') as FormArray;
  }

  // Método para remover um controle de telefone do FormArray
  removerTelefone(index: number): void {
    this.telefones.removeAt(index);
  }

  // Método para lidar com o envio do formulário
  Submit(): void {
    // código de manipulação de envio 
    this.onSubmit.emit(this.clienteForm.value);
  }
}
