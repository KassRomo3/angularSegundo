import { Routes } from '@angular/router';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';
import { ZodiacoComponent } from './formulario/zodiaco/zodiaco.component';
/* import { EmpleadosComponent } from './formulario/empleados/empleados.component'; */

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/feature/auth.routes')
    },
    /* {
        path: '*',
        redirectTo: ''
    }, */
    {
        path: 'ejemplo1',
        component: Ejemplo1Component
    },
    {
        path: 'zodiaco',
        component: ZodiacoComponent
    }/* ,
    {
        path: 'empleados',
        component: EmpleadosComponent
    } */
];
