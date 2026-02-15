import { CadastroDeContaComponent } from './features/cadastro-de-conta/cadastro-de-conta.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cadastro-de-conta',
    loadChildren: () => import('./features/cadastro-de-conta/cadastro-de-conta.routes')
      .then(m => m.CadastroDeContaRoutes)
  }
];
