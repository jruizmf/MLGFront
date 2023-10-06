import { IArticulo } from "./articulo";
import { ICliente } from "./cliente";

export interface IArticuloCliente {
  id?: string;
  articuloId?: string;
  clienteId?: string;
  cliente?:ICliente;
  cantidad?: number;
  articulo?: IArticulo;
  fecha?: Date;
}
