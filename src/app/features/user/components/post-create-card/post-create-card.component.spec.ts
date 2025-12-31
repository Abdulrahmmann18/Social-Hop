import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateCardComponent } from './post-create-card.component';

describe('PostCreateCardComponent', () => {
  let component: PostCreateCardComponent;
  let fixture: ComponentFixture<PostCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
