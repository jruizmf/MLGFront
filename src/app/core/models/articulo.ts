
export interface IArticulo {
    id?: string | null;
    codigo: string;
    descripcion: string;
    precio: GLfloat;
    imagen?: string;
    stock: number;
}
