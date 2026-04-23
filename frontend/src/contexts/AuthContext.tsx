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
  isAuthReady: boolean;
  guestSession: GuestSession | null;
  supabaseUser: any;
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
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Restore guest session first
        const stored = localStorage.getItem(GUEST_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.isGuest) {
              setGuestSession(parsed);
              setIsLoggedIn(true);
            }
          } catch {
            // ignore broken guest data
          }
        }

        // Check Supabase session
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setSupabaseUser(data.session.user);
          setIsLoggedIn(true);
        }

        // Listen to auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session) {
              setSupabaseUser(session.user);
              setIsLoggedIn(true);
            } else {
              setSupabaseUser(null);
              setIsLoggedIn(!!guestSession);
            }
          }
        );

        setIsAuthReady(true);

        return () => {
          authListener?.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth init error:", error);
        setIsAuthReady(true);
      }
    };

    const unsubscribe = initAuth();

    return () => {
      unsubscribe?.then((unsub) => unsub?.());
    };
  }, []);

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
    setSupabaseUser(null);
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  const isGuest = !!guestSession;

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        isLoggedIn,
        isAuthReady,
        guestSession,
        supabaseUser,
        loginAsGuest,
        logout,
        username: isGuest ? "Guest User" : supabaseUser?.email || "User",
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
