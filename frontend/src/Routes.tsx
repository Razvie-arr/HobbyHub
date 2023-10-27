import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { DefaultEventsPage, EventForm, EventsPage } from 'src/modules/events';
import { NotFoundPage } from 'src/shared/navigation';

import { VerifyUserPage } from './modules/auth';
import { route } from './route';

export const Routes = () => (
  <RouterRoutes>
    <Route path={route.home()} element={<DefaultEventsPage />} />
    <Route path={route.events()} element={<EventsPage />} />
    <Route path={route.createEvent()} element={<EventForm />} />
    <Route path={route.verifyUser()} element={<VerifyUserPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </RouterRoutes>
);

