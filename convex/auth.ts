import { convexAuth } from '@convex-dev/auth/server';
import CustomProfile from './CustomProfile';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomProfile],
});
