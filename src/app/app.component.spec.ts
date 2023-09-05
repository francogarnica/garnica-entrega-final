import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

//Es un agrupador de casos de preuba
//En este caso agrupa todas las pruebas relacionadas al appComponent
describe('AppComponent', () => {
  //beforeEach SE DISPARA ANTES DE CADA PRUEBA
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  //it DEFINE CADA CASO DE PRUEBAS
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //expect sirve para definir una expectativa a evaluar
    expect(app).toBeTruthy(); //APP no debe ser ni null, ni false ni undefined
  });

  //DEBERIA TENER UN TITULO COMO...
  it(`should have as title 'garnica-entrega-final'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('garnica-entrega-final');
  });

  //DEBERIA RENDERIZAR EL TITULO EN EL HTML
  //Esto es una prueba de integracion
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('garnica-entrega-final app is running!');
  // });
});
