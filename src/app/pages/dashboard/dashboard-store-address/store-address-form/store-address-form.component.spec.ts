import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreAddressComponent } from '../store-address.component';


describe('StoreAddressComponent', () => {
  let component: StoreAddressComponent;
  let fixture: ComponentFixture<StoreAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreAddressComponent]
    });
    fixture = TestBed.createComponent(StoreAddressComponent);
    component = fixture.componentInstance;StoreAddressComponent
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
