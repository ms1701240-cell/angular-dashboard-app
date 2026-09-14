import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/login/login';
import { authGuard } from './core/Guards/auth.guards';

export const routes: Routes = [
    {path:'login',component:Login},

    {
      path:'',
      component:MainLayout,
      canActivate:[authGuard],
      children:[
            { path: '', 
            loadComponent:() => import('./pages/home/home').then(m => m.Home)
            },
            { path: 'dashboard',
             loadComponent:() => import('./pages/dashboard/dashboard').then(m => m.Dashboard) 
            },
            {
                 path:'students',
            children:[
                {path:'',
                    loadComponent:() => import('./pages/students/students').then(m => m.Students)
                },
                { path: 'studentdetails/:id', 
                    loadComponent:() => import('./pages/studentdetails/studentdetails').then(m => m.Studentdetails)
                 }
            ]
            },
            {
                path:'teacher',
            children:[
                {path:'',
                 loadComponent:() => import('./pages/teacher/teacher').then(m => m.Teacher)
                },
                {path:'teacherdetails/:id',
                    loadComponent:() => import('./pages/teacherdetails/teacherdetails').then(m => m.Teacherdetails)
                }
            ]
            },
            {path:'regist',
                loadComponent:()=>import('./pages/regist/regist').then(m=>m.Regist)
            }
      ]

    },
    {path:'**',redirectTo:'login'}
];