import create from 'zustand';
import supabase from '../supabase';
import type { User, Session, ApiError } from '@supabase/supabase-js';

export interface AuthStore {
  user: User | null,
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; session: Session | null; error: ApiError | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; session: Session | null; error: ApiError | null }>;
  signOut: () => Promise<{ error: ApiError | null }>;
  session: () => Session | null;
  getUser: () => Promise<{ user: User | null; error: ApiError | null }>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  signUp: async (email, password) => {
    return supabase.auth.signUp(
      { email, password },
      { redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_REDIRECT!}/auth/verified?message=Congratz!` },
    );
  },

  signIn: async (email, password) => {
    return supabase.auth.signIn({ email, password });
  },

  signOut: async () => {
    return supabase.auth.signOut();
  },

  session: () => {
    return supabase.auth.session();
  },

  getUser: async () => {
    const session = supabase.auth.session();
    if (session && session.access_token) {
      const {user, error} = await supabase.auth.api.getUser(session.access_token);
      set(() => ({user: user}))
      return {user, error}
    }
    throw new Error('no user signed in')
  },
}));

export default useAuthStore;
