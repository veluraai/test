import { Swords, Clock, Users, Trophy, ChevronRight, Zap } from "lucide-react";

const activeDuels = [
  { opponent: "Priya_S", subject: "Physics", status: "Your turn", initials: "PS" },
  { opponent: "Rohan_K", subject: "Maths", status: "Waiting...", initials: "RK" },
];

const pastDuels = [
  { opponent: "Sneha_M", subject: "Chemistry", result: "Won", xp: "+30 XP", initials: "SM" },
  { opponent: "Arjun_D", subject: "History", result: "Lost", xp: "+5 XP", initials: "AD" },
  { opponent: "Kavya_R", subject: "Maths", result: "Won", xp: "+30 XP", initials: "KR" },
];

const DuelsScreen = () => {
  return (
    <div className="px-5 pb-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Duels ⚔️</h1>
        <p className="text-sm text-muted-foreground mt-1">Challenge friends or get matched</p>
      </div>

      {/* Quick Match */}
      <button className="w-full flex items-center gap-4 rounded-2xl border border-primary/30 bg-card p-5 active:scale-[0.98] transition-transform">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-foreground">Quick Match</p>
          <p className="text-xs text-muted-foreground">Find a random opponent now</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Active Duels */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Active Duels</h2>
        <div className="space-y-3">
          {activeDuels.map((d) => (
            <div key={d.opponent} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-xs font-bold text-foreground">
                {d.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{d.opponent}</p>
                <p className="text-xs text-muted-foreground">{d.subject}</p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  d.status === "Your turn"
                    ? "bg-primary/10 text-primary"
                    : "bg-border text-muted-foreground"
                }`}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Past Duels */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Past Duels</h2>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {pastDuels.map((d) => (
            <div key={d.opponent} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-border text-xs font-bold text-foreground">
                {d.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{d.opponent}</p>
                <p className="text-xs text-muted-foreground">{d.subject}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-xs font-bold ${
                    d.result === "Won" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {d.result}
                </p>
                <p className="text-[10px] text-muted-foreground">{d.xp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuelsScreen;
