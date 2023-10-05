import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeOptionsViewerComponent } from './compose-options-viewer.component';

describe('ComposeOptionsViewerComponent', () => {
  let component: ComposeOptionsViewerComponent;
  let fixture: ComponentFixture<ComposeOptionsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeOptionsViewerComponent]
    });
    fixture = TestBed.createComponent(ComposeOptionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
