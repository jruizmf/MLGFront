import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';
import { ComposeOptionsViewerComponent } from '../components/compose-options-viewer/compose-options-viewer.component';

@Component({
  selector: 'app-dashboard-order-form',
  templateUrl: './dashboard-order-form.component.html',
  styleUrls: ['./dashboard-order-form.component.scss']
})
export class DashboardOrderFormComponent {
  orderID: any = "";
  order: any = {};

  constructor(private _clienteArticuloService: ClienteArticuloService, private dialog: MatDialog, private router: Router,  private route : ActivatedRoute) { 
    this.orderID = this.route.snapshot.paramMap.get('term')
    console.log(window.devicePixelRatio)
  }


  getOrder(){
    this._clienteArticuloService.findByTerm(this.orderID).then((res:any) => {
      this.order = res;
    })  
  }

  ngOnInit(): void {
   this.getOrder();
  }
  openDialog(): void {
   
    
    const dialogRef = this.dialog.open(ComposeOptionsViewerComponent, {
      data: {
        data: this.order.optionComposes,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {

      if (typeof result != 'undefined') {
        let cartString  = localStorage.getItem('cart')
        let cart: any = { items:[] }
     
      

        if(cartString != null){
      
            
          this.router.navigate(['articulos']);
        } else{
        
          this.router.navigate(['articulos']);
        }
        
      }
    });
  }
}
