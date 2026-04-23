import { ArrowLeft, Camera, Check } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const allSubjects = ["Maths", "Physics", "Chemistry", "History", "CS", "Biology", "English"];

interface EditProfileScreenProps {
  onBack: () => void;
}

const EditProfileScreen = ({ onBack }: EditProfileScreenProps) => {
  const { isGuest, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(isGuest ? "" : "Ankur Verma");
  const [username, setUsername] = useState(isGuest ? "" : "Ankur_V");
  const [bio, setBio] = useState(isGuest ? "" : "God of Logics in the making 🧠");
  const [subjects, setSubjects] = useState(isGuest ? [] : ["Maths", "Physics"]);

  const toggleSubject = (s: string) => {
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  if (isGuest) {
    return (
      <div className="px-5 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
        </div>
        <div className="flex flex-col items-center pt-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-border text-2xl font-bold text-muted-foreground">
            G
          </div>
          <p className="text-base font-bold text-foreground mt-4">Create an account to unlock this</p>
          <p className="text-sm text-muted-foreground mt-2">Sign up to customize your profile, save progress, and compete in duels.</p>
          <button
            onClick={() => { logout(); navigate("/signup"); }}
            className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary text-2xl font-bold text-primary">
            AV
          </div>
          <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-xs text-primary font-medium mt-2">Change Photo</p>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Display Name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">@</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-input border border-border pl-8 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 100))}
            rows={2}
            className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
          />
          <p className="text-[10px] text-muted-foreground mt-1 text-right">{bio.length}/100</p>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Subjects</label>
          <div className="flex flex-wrap gap-2">
            {allSubjects.map((s) => (
              <button
                key={s}
                onClick={() => toggleSubject(s)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  subjects.includes(s)
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                {subjects.includes(s) && <Check className="h-3.5 w-3.5" />}
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-8">
        <button className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground active:scale-[0.98] transition-transform">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
