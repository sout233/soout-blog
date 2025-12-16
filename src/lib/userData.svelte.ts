import type { Session } from '@supabase/supabase-js';

class UserState {
    session = $state<Session | null>(null);
    
    avatarUrl = $derived(
        this.session?.user?.user_metadata?.avatar_url ?? null
    );

    setSession(newSession: Session | null) {
        this.session = newSession;
    }
}

export const userState = new UserState();