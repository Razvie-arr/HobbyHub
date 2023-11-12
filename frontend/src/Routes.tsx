import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { OnboardingForm, VerifyUserPage } from 'src/modules/auth';
import {
  CreateEventForm,
  DefaultEventsPage,
  EditEventForm,
  EventDetailsPage,
  EventsPage,
  SearchEventsPage,
} from 'src/modules/events';
import { NotFoundPage } from 'src/shared/navigation';

import { GroupDetailsPage, GroupsPage } from './modules/groups';
import { MessagesPage } from './modules/messages';
import { route } from './route';

export const Routes = () => (
  <RouterRoutes>
    <Route path={route.home()} element={<DefaultEventsPage />} />

    <Route path={route.events()} element={<EventsPage />} />
    <Route path={route.searchEvents()} element={<SearchEventsPage />} />
    <Route path={route.createEvent()} element={<CreateEventForm />} />
    <Route path={route.editEvent()} element={<EditEventForm />} />
    <Route path={route.eventDetails()} element={<EventDetailsPage />} />

    <Route path={route.groups()} element={<GroupsPage />} />
    <Route path={route.groupDetails()} element={<GroupDetailsPage />} />

    <Route path={route.onboarding()} element={<OnboardingForm />} />
    <Route path={route.verifyUser()} element={<VerifyUserPage />} />
    <Route path={route.messages()} element={<MessagesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </RouterRoutes>
);
