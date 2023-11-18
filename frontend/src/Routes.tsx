import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { OnboardingForm, useAuth, VerifyUserPage } from 'src/modules/auth';
import { CreateEventForm, EditEventForm, EventDetailsPage, EventsPage } from 'src/modules/events';
import { NotFoundPage } from 'src/shared/navigation';

import { CreateGroupForm, EditGroupForm, GroupDetailsPage, GroupsPage } from './modules/groups';
import { MessagesPage } from './modules/messages';
import { SearchPage } from './modules/search';
import { route } from './route';

export const Routes = () => {
  const { user } = useAuth();
  return (
    <RouterRoutes>
      <Route path={route.events()} element={<EventsPage />} />
      <Route path={route.search()} element={<SearchPage />} />
      <Route path={route.createEvent()} element={<CreateEventForm />} />
      <Route path={route.editEvent()} element={<EditEventForm />} />
      <Route path={route.eventDetails()} element={<EventDetailsPage />} />

      <Route path={route.groups()} element={<GroupsPage />} />
      <Route path={route.groupDetails()} element={<GroupDetailsPage />} />
      <Route path={route.createGroup()} element={<CreateGroupForm />} />
      <Route path={route.editGroup()} element={<EditGroupForm />} />

      <Route path={route.onboarding()} element={<OnboardingForm />} />
      <Route path={route.verifyUser()} element={<VerifyUserPage />} />

      {user ? <Route path={route.messages()} element={<MessagesPage user={user} />} /> : null}

      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

