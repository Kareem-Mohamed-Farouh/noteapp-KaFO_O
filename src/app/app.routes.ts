import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { GallaryComponent } from './pages/gallary/gallary.component';
import { authguardGuard } from './core/guards/auth/authguard.guard';
import { userguardGuard } from './core/guards/user/userguard.guard';

export const routes: Routes = [
  // auth layout
  {
    path: '',
    component: AuthlayoutComponent,
    canActivate: [authguardGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
        title: 'Login',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
    ],
  },

  // user layout
  {
    path: '',
    component: UserlayoutComponent,
    canActivate: [userguardGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About',
      },
      {
        path: 'gallary',
        component: GallaryComponent,
        title: 'Gallary',
      },
      {
        path: '**',
        component: NotfoundComponent,
        title: 'Not Faound',
      },
    ],
  },

  // not found
];
