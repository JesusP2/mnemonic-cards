import create from 'zustand';
import supabase from '../supabase';
import type { User, Session, ApiError } from '@supabase/supabase-js';

export interface AuthStore {
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
    getUser: (token: string) => Promise<{ user: User | null; error: ApiError | null }>;
}

const useAuthStore = create<AuthStore>(() => ({
    signUp: async (email, password) => {
        return supabase.auth.signUp(
            { email, password },
            { redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_REDIRECT!}/login?message=Congratz!` },
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

    getUser: (token: string) => {
        return supabase.auth.api.getUser(token);
    },
}));

export default useAuthStore;
