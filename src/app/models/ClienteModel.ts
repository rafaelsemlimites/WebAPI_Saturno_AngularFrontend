import { TelefoneModel } from "./TelefoneModel";

export interface ClienteModel {
  id?: number;
  nome: string;
  email: string;
  telefones: Array<TelefoneModel>;
  tipoCliente: string;
  ativo: boolean;
  dataDeCriacao?: string;
  dataDeAlteracao?: string;
}