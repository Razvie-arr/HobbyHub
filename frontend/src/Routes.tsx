import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { Events } from 'src/modules/events';
import { HomePage } from 'src/modules/home';
import { NotFoundPage } from 'src/shared/navigation';

import { VerifyUserPage } from './modules/auth';
import { route } from './route';

export const Routes = () => (
  <RouterRoutes>
    <Route path={route.home()} element={<HomePage />} />
    <Route path={route.events()} element={<Events />} />
    <Route path={route.verifyUser()} element={<VerifyUserPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </RouterRoutes>
);

