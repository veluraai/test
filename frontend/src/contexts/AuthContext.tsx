import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  logout: () => void;
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

  useEffect(() => {
    const stored = localStorage.getItem(GUEST_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isGuest) {
          setGuestSession(parsed);
          setIsLoggedIn(true);
        }
      } catch {}
    }
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

  const logout = () => {
    localStorage.removeItem(GUEST_KEY);
    setGuestSession(null);
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
