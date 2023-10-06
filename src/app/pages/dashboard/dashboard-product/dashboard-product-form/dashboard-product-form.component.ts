import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticulo } from 'src/app/core/models';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FileService } from 'src/app/core/services/file.service';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-product-form',
  templateUrl: './dashboard-product-form.component.html',
  styleUrls: ['./dashboard-product-form.component.scss']
})
export class DashboardProductFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  attributeForm: FormGroup = new FormGroup({});
  errors:any[]= [];

  articulo: IArticulo = {
    codigo: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    stock: 0,
  };
  fileName: string = "";
  fileAttr = 'Seleccione archivo';
  addOnBlur = true;
  hasAttributesAdded:boolean = false
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  composeOptions: any[] = [];
  imagen: any = null;
  announcer = inject(LiveAnnouncer);
  priceForm: FormGroup = new FormGroup({});
  salesForOrderForm: FormGroup = new FormGroup({});
  articuloId: any;
  isEditing: boolean;
  isLoading: boolean;

  constructor(private fb: FormBuilder,  public dialog: MatDialog,
     private _articuloService: ArticulosService, private _uploadService: FileService, private router: Router, private route:ActivatedRoute) { 
      this.isLoading = true;
      this.form = this.fb.group({
        codigo: ["", [Validators.required]],
        descripcion: ["", [Validators.required]],
        precio: [0, [Validators.required]],
        stock:[0],
      });
      this.articuloId = this.route.snapshot.paramMap.get('term');

      if (this.articuloId == null) {
        this.isEditing = false;
        this.isLoading = false;
      } else{
        this.isEditing = true;
        this._articuloService.getOne(this.articuloId).then((articulo:any) => {

          this.articulo = articulo as IArticulo;
          
          this.form.controls['codigo'].patchValue(this.articulo.codigo);
          this.form.controls['descripcion'].patchValue(this.articulo.descripcion);
          this.form.controls['precio'].patchValue(this.articulo.precio);
          this.form.controls['stock'].patchValue(this.articulo.stock);
        
          this.isLoading = false;
        });
      }
  }

  ngOnInit(): void {
  }

  addImages(event:any): void{
    this.imagen = event[0];
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Swal.fire('Aun hay campos sin completar...', 'Por favor revise el formulario!', 'error')
      return;
    }
    let articulo: IArticulo = this.getProduct();
    setTimeout(()=>{   
      if (this.isEditing) {
       
        this._articuloService.actualizar(this.articuloId, articulo).subscribe( () => {
          this.form.disable();
          this.router.navigate(['dashboard/articulos']);
          }, () => {
            Swal.fire('SAlgo salio mal.', 'Favor de buscar asistencia tecnica!', 'error')
          }
        )
      } else{
        delete articulo.id
        this._articuloService.guardar(articulo).subscribe( () => {
          this.form.disable();
          this.router.navigate(['dashboard/articulos']);
          }, () => {
            Swal.fire('Algo salio mal.', 'Favor de buscar asistencia tecnica!', 'error')
          }
        )
      }
    
    }, 6000);   
  }

  getProduct():IArticulo{
    
    this.articulo = {
      id: this.articuloId,
      codigo:this.form.value.codigo,
      descripcion:this.form.value.descripcion,
      precio:this.form.value.precio,
      stock:Number(this.form.value.stock),
      imagen: ""
    }
    
    if(this.imagen != null){
      this._uploadService.upload(this.imagen).then((res: any) => {
        this.articulo.imagen = res;
      })
  
    }
   
    return this.articulo;
  }

  
}