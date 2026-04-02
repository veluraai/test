import { Home, MessageSquare, Swords, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import GuestBanner from "@/components/dashboard/GuestBanner";
import HomeScreen from "@/components/dashboard/HomeScreen";
import ChatScreen from "@/components/dashboard/ChatScreen";
import DuelsScreen from "@/components/dashboard/DuelsScreen";
import ProfileScreen from "@/components/dashboard/ProfileScreen";
import OnboardingScreen from "@/components/dashboard/OnboardingScreen";
import NotificationsScreen from "@/components/dashboard/NotificationsScreen";
import SettingsScreen from "@/components/dashboard/SettingsScreen";
import EditProfileScreen from "@/components/dashboard/EditProfileScreen";
import SearchScreen from "@/components/dashboard/SearchScreen";
import MiniProfile from "@/components/dashboard/MiniProfile";
import GuestModal from "@/components/dashboard/GuestModal";

type Tab = "home" | "chat" | "duels" | "profile";
type SubScreen = null | "notifications" | "settings" | "editProfile" | "search" | "miniProfile";

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "duels", label: "Duels", icon: Swords },
  { id: "profile", label: "Profile", icon: User },
];

const DashboardPage = () => {
  const { isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [subScreen, setSubScreen] = useState<SubScreen>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const done = localStorage.getItem("velura_onboarding_done");
    return !done;
  });
  const [guestModal, setGuestModal] = useState<string | null>(null);
  const [miniProfileUser, setMiniProfileUser] = useState<any>(null);

  const handleOnboardingComplete = () => {
    localStorage.setItem("velura_onboarding_done", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const handleTabChange = (tab: Tab) => {
    if (tab === "duels" && isGuest) {
      setGuestModal("Create an account to challenge others in duels");
      return;
    }
    setSubScreen(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (subScreen === "notifications") return <NotificationsScreen onBack={() => setSubScreen(null)} />;
    if (subScreen === "settings") return <SettingsScreen onBack={() => setSubScreen(null)} onEditProfile={() => setSubScreen("editProfile")} />;
    if (subScreen === "editProfile") return <EditProfileScreen onBack={() => setSubScreen(subScreen === "editProfile" ? "settings" : null)} />;
    if (subScreen === "search") return <SearchScreen onBack={() => setSubScreen(null)} onUserTap={(u) => { setMiniProfileUser(u); setSubScreen("miniProfile"); }} />;
    if (subScreen === "miniProfile" && miniProfileUser) return <MiniProfile user={miniProfileUser} onBack={() => { setMiniProfileUser(null); setSubScreen("search"); }} />;

    switch (activeTab) {
      case "home": return <HomeScreen onNotifications={() => setSubScreen("notifications")} onSearch={() => setSubScreen("search")} onUserTap={(u) => { setMiniProfileUser(u); setSubScreen("miniProfile"); }} />;
      case "chat": return <ChatScreen />;
      case "duels": return <DuelsScreen />;
      case "profile": return <ProfileScreen onSettings={() => setSubScreen("settings")} onEditProfile={() => setSubScreen("editProfile")} onNotifications={() => setSubScreen("notifications")} />;
      default: return null;
    }
  };

  const showNav = !subScreen;

  return (
    <div className="relative min-h-screen bg-background flex flex-col max-w-[430px] mx-auto">
      <GuestBanner />
      <div className={`flex-1 overflow-y-auto pt-4 ${showNav ? "pb-20" : "pb-6"}`}>
        {renderContent()}
      </div>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-40">
          <div className="max-w-[430px] mx-auto border-t border-border bg-card/95 backdrop-blur-md">
            <div className="flex items-center justify-around py-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {guestModal && <GuestModal message={guestModal} onClose={() => setGuestModal(null)} />}
    </div>
  );
};

export default DashboardPage;
