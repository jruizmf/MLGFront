import { ICliente } from "./cliente";
import { IUsuario } from "./usuario";

export interface IUsuarioCliente {
  id?: string;
  usuarioId?: string;
  clienteId?: string;
  usuario?: IUsuario;
  cliente?: ICliente;
  fecha?: Date;
}
