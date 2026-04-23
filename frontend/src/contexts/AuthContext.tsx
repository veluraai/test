import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface GuestSession {
  isGuest: true;
  guestId: string;
  username: string;
  avatar: null;
  xp: number;
  streak: number;
  badge: string;
}

interface AuthContextType {
  isGuest: boolean;
  isLoggedIn: boolean;
  guestSession: GuestSession | null;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  username: string;
  xp: number;
  streak: number;
  badge: string;
  duelsWon: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const GUEST_KEY = "velura_guest_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [guestSession, setGuestSession] = useState<GuestSession | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSupabaseSession, setHasSupabaseSession] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // Check for guest session first
      const stored = localStorage.getItem(GUEST_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.isGuest) {
            setGuestSession(parsed);
            setIsLoggedIn(true);
            return; // Guest mode takes precedence
          }
        } catch {}
      }

      // Check for Supabase session
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setHasSupabaseSession(true);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking Supabase session:", error);
      }
    };

    initAuth();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setHasSupabaseSession(true);
          setIsLoggedIn(true);
        } else {
          setHasSupabaseSession(false);
          // Keep logged in if guest session exists
          if (!guestSession) {
            setIsLoggedIn(false);
          }
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [guestSession]);

  const loginAsGuest = () => {
    const session: GuestSession = {
      isGuest: true,
      guestId: "guest_" + Math.random().toString(36).substring(2, 10),
      username: "Guest User",
      avatar: null,
      xp: 0,
      streak: 0,
      badge: "Tech_Teen",
    };
    localStorage.setItem(GUEST_KEY, JSON.stringify(session));
    setGuestSession(session);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    localStorage.removeItem(GUEST_KEY);
    setGuestSession(null);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setHasSupabaseSession(false);
    setIsLoggedIn(false);
  };

  const isGuest = !!guestSession;

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        isLoggedIn,
        guestSession,
        loginAsGuest,
        logout,
        username: isGuest ? "Guest User" : "Ankur_V",
        xp: isGuest ? 0 : 2450,
        streak: isGuest ? 0 : 5,
        badge: isGuest ? "Tech_Teen" : "Tech_Burner",
        duelsWon: isGuest ? 0 : 12,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
