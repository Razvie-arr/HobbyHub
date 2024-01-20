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
import { route } from './route';

export const Routes = () => {
  const { user } = useAuth();
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

      <Route path={route.profile()} element={<ProfileDetailsPage />} />
      <Route path={route.currentProfile()} element={<ProfileDetailsPage />} />

      <Route path={route.addReview()} element={<AddReviewPage />} />

      <Route path={route.createEvent()} element={<CreateEventForm />} />
      <Route path={route.editEvent()} element={<EditEventForm />} />
      <Route path={route.createGroup()} element={<CreateGroupForm />} />
      <Route path={route.editGroup()} element={<EditGroupForm />} />
      <Route path={route.onboarding()} element={<OnboardingForm />} />
      <Route path={route.verifyUser()} element={<VerifyUserPage />} />
      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route path={route.forgotPassword()} element={<ForgotPasswordPage />} />
      <Route path={route.resetPassword()} element={<ResetPasswordPage />} />

      <Route path={route.editProfile()} element={<EditProfilePage />} />

      {user ? <Route path={route.messages()} element={<MessagesPage user={user} />} /> : null}

      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

