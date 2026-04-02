import { ArrowLeft, Moon, Sun, ChevronRight, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SettingsScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
}

const SettingsScreen = ({ onBack, onEditProfile }: SettingsScreenProps) => {
  const { logout, isGuest } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [notifDuels, setNotifDuels] = useState(true);
  const [notifStreaks, setNotifStreaks] = useState(true);
  const [notifChallenges, setNotifChallenges] = useState(true);
  const [notifBadges, setNotifBadges] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-border"}`}
    >
      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${
          value ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-5 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Account */}
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Account</p>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border mb-6">
        <button onClick={onEditProfile} className="flex items-center w-full px-4 py-3.5">
          <span className="text-sm text-foreground flex-1 text-left">Edit Profile</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="flex items-center w-full px-4 py-3.5">
          <span className="text-sm text-foreground flex-1 text-left">Change Password</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="flex items-center w-full px-4 py-3.5">
          <span className="text-sm text-foreground flex-1 text-left">Linked Accounts</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Preferences */}
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Preferences</p>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border mb-6">
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">Dark Mode</span>
          <Toggle value={darkMode} onChange={setDarkMode} />
        </div>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">Duel Notifications</span>
          <Toggle value={notifDuels} onChange={setNotifDuels} />
        </div>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">Streak Reminders</span>
          <Toggle value={notifStreaks} onChange={setNotifStreaks} />
        </div>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">Challenge Alerts</span>
          <Toggle value={notifChallenges} onChange={setNotifChallenges} />
        </div>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">Badge Notifications</span>
          <Toggle value={notifBadges} onChange={setNotifBadges} />
        </div>
      </div>

      {/* About */}
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">About</p>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border mb-6">
        <button className="flex items-center w-full px-4 py-3.5">
          <span className="text-sm text-foreground flex-1 text-left">Terms of Service</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="flex items-center w-full px-4 py-3.5">
          <span className="text-sm text-foreground flex-1 text-left">Privacy Policy</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-sm text-foreground flex-1">App Version</span>
          <span className="text-xs text-muted-foreground">1.0.0</span>
        </div>
      </div>

      {/* Danger Zone */}
      <p className="text-xs text-destructive uppercase tracking-wider font-medium mb-3">Danger Zone</p>
      <div className="rounded-2xl border border-destructive/20 bg-card mb-6">
        <button onClick={() => setShowDeleteModal(true)} className="flex items-center w-full px-4 py-3.5">
          <Trash2 className="h-4 w-4 text-destructive mr-3" />
          <span className="text-sm text-destructive flex-1 text-left">Delete Account</span>
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full rounded-xl border border-border py-3.5 text-sm font-medium text-muted-foreground"
      >
        {isGuest ? "Exit Guest Mode" : "Logout"}
      </button>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-8">
          <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-6 relative">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-3 right-3 text-muted-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="text-center pt-2">
              <p className="text-base font-bold text-foreground">Delete Account?</p>
              <p className="text-sm text-muted-foreground mt-2">This action cannot be undone. All your data will be permanently deleted.</p>
              <div className="flex flex-col gap-2 mt-6">
                <button className="w-full rounded-xl bg-destructive py-3 text-sm font-bold text-destructive-foreground">
                  Delete Permanently
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
