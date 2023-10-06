import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddProductComponent } from './store-add-product.component';

describe('PasswordEditorComponent', () => {
  let component: StoreAddProductComponent;
  let fixture: ComponentFixture<StoreAddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreAddProductComponent]
    });
    fixture = TestBed.createComponent(StoreAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
