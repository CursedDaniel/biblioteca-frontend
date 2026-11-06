import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityPage } from './entity-page';

describe('EntityPage', () => {
  let component: EntityPage;
  let fixture: ComponentFixture<EntityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
