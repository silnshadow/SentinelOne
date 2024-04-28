import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiModelsComponent } from './ai-models.component';

describe('AiModelsComponent', () => {
  let component: AiModelsComponent;
  let fixture: ComponentFixture<AiModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
