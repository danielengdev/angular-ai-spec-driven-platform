
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroDeContaComponent } from './cadastro-de-conta.component';

describe('CadastroDeContaComponent', () => {
  let component: CadastroDeContaComponent;
  let fixture: ComponentFixture<CadastroDeContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeContaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDeContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
