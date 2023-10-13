import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { SignInPage, SignUpPage } from 'src/modules/auth';
import { HomePage } from 'src/modules/home';
import { NotFoundPage } from 'src/shared/navigation';

import { route } from './route';

export const Routes = () => (
  <RouterRoutes>
    <Route path={route.home()} element={<HomePage />} />
    <Route path={route.signIn()} element={<SignInPage />} />
    <Route path={route.signUp()} element={<SignUpPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </RouterRoutes>
);
