import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { OnboardingForm, useAuth, VerifyUserPage } from 'src/modules/auth';
import { CreateEventForm, EditEventForm, EventDetailsPage, EventsPage } from 'src/modules/events';
import { NotFoundPage } from 'src/shared/navigation';

import { ForgotPasswordPage, ResetPasswordPage, SignInPage, SignUpPage } from './modules/auth/pages';
import { CreateGroupForm, EditGroupForm, GroupDetailsPage, GroupsPage } from './modules/groups';
import { LandingPage } from './modules/landing';
import { MessagesPage } from './modules/messages';
import { EditProfilePage, ProfileDetailsPage } from './modules/profile';
import { AddReviewPage } from './modules/reviews';
import { SearchPage } from './modules/search';
import { NotAuthorized } from './shared/design-system';
import { WithAuthUser } from './shared/types';
import { route } from './route';

export const Routes = () => {
  const { user } = useAuth();

  const createProtectedRoute = (Component: ({ user }: WithAuthUser) => JSX.Element | null) =>
    user ? <Component user={user} /> : <NotAuthorized requireSignIn wrapInContentContainer />;

  return (
    <RouterRoutes>
      <Route path={route.landing()} element={<LandingPage />} />

      <Route path={route.events()} element={<EventsPage />} />
      <Route path={route.eventDetails()} element={<EventDetailsPage />} />

      <Route path={route.groups()} element={<GroupsPage />} />
      <Route path={route.groupDetails()} element={<GroupDetailsPage />} />

      <Route path={route.search()} element={<SearchPage />} />

      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route path={route.verifyUser()} element={<VerifyUserPage />} />

      <Route path={route.currentProfile()} element={<ProfileDetailsPage />} />
      <Route path={route.profile()} element={<ProfileDetailsPage />} />

      <Route path={route.verifyUser()} element={<VerifyUserPage />} />
      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route path={route.forgotPassword()} element={<ForgotPasswordPage />} />
      <Route path={route.resetPassword()} element={<ResetPasswordPage />} />

      <Route path={route.onboarding()} element={createProtectedRoute(OnboardingForm)} />

      <Route path={route.messages()} element={createProtectedRoute(MessagesPage)} />

      <Route path={route.createEvent()} element={createProtectedRoute(CreateEventForm)} />
      <Route path={route.editEvent()} element={createProtectedRoute(EditEventForm)} />

      <Route path={route.createGroup()} element={createProtectedRoute(CreateGroupForm)} />
      <Route path={route.editGroup()} element={createProtectedRoute(EditGroupForm)} />

      <Route path={route.editProfile()} element={createProtectedRoute(EditProfilePage)} />

      <Route path={route.addReview()} element={createProtectedRoute(AddReviewPage)} />

      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

