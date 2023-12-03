import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { OnboardingForm, useAuth, VerifyUserPage } from 'src/modules/auth';
import { CreateEventForm, EditEventForm, EventDetailsPage, EventsPage } from 'src/modules/events';
import { NotFoundPage } from 'src/shared/navigation';

import { SignInPage, SignUpPage } from './modules/auth/pages';
import { CreateGroupForm, EditGroupForm, GroupDetailsPage, GroupsPage } from './modules/groups';
import { MessagesPage } from './modules/messages';
import { AddReviewPage } from './modules/reviews';
import { SearchPage } from './modules/search';
import { route } from './route';

export const Routes = () => {
  const { user } = useAuth();
  return (
    <RouterRoutes>
      <Route path={route.events()} element={<EventsPage />} />
      <Route path={route.eventDetails()} element={<EventDetailsPage />} />

      <Route path={route.groups()} element={<GroupsPage />} />
      <Route path={route.groupDetails()} element={<GroupDetailsPage />} />

      <Route path={route.search()} element={<SearchPage />} />

      <Route path={route.signin()} element={<SignInPage />} />
      <Route path={route.signup()} element={<SignUpPage />} />
      <Route path={route.verifyUser()} element={<VerifyUserPage />} />

      <Route path={route.addReview()} element={<AddReviewPage />} />

      <Route path={route.createEvent()} element={<CreateEventForm />} />
      <Route path={route.editEvent()} element={<EditEventForm />} />
      <Route path={route.createGroup()} element={<CreateGroupForm />} />
      <Route path={route.editGroup()} element={<EditGroupForm />} />
      <Route path={route.onboarding()} element={<OnboardingForm />} />

      {user ? <Route path={route.messages()} element={<MessagesPage user={user} />} /> : null}

      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

