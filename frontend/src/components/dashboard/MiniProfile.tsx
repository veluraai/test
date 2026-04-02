import { ArrowLeft, Swords, Trophy } from "lucide-react";

interface MiniProfileProps {
  user: { name: string; initials: string; badge: string; xp: string };
  onBack: () => void;
}

const recentBadges = [
  { name: "Tech_Teen", date: "Jan 2025" },
  { name: "Tech_Burner", date: "Feb 2025" },
];

const MiniProfile = ({ user, onBack }: MiniProfileProps) => {
  return (
    <div className="px-5 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User info */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary text-2xl font-bold text-primary">
          {user.initials}
        </div>
        <p className="text-lg font-bold text-foreground mt-3">@{user.name}</p>
        <p className="text-sm text-primary mt-0.5">{user.badge}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-bold text-foreground">{user.xp.replace(" XP", "")}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">XP</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-bold text-foreground">28</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Duels</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-bold text-foreground">72%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Win Rate</p>
        </div>
      </div>

      {/* Top Subject */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Top Subject</p>
        <p className="text-sm font-bold text-foreground">Physics</p>
      </div>

      {/* Challenge button */}
      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground active:scale-[0.98] transition-transform mb-6">
        <Swords className="h-4 w-4" />
        Challenge to Duel
      </button>

      {/* Recent Badges */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Recent Badges</p>
        <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {recentBadges.map((b) => (
            <div key={b.name} className="min-w-[120px] rounded-2xl border border-primary/30 bg-card p-3 flex-shrink-0 text-center">
              <span className="text-lg">🏆</span>
              <p className="text-xs font-bold text-primary mt-1">{b.name}</p>
              <p className="text-[10px] text-muted-foreground">{b.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
