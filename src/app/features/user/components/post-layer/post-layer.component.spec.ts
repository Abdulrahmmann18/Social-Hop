import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLayerComponent } from './post-layer.component';

describe('PostLayerComponent', () => {
  let component: PostLayerComponent;
  let fixture: ComponentFixture<PostLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
