import { ArrowLeft, Search as SearchIcon, X, Swords } from "lucide-react";
import { useState } from "react";

const recentSearches = ["Quadratic equations", "Newton's Laws", "Priya_S"];

const topicResults = [
  { subject: "Maths", topic: "Quadratic Equations", difficulty: "Medium" },
  { subject: "Maths", topic: "Quadratic Formula", difficulty: "Hard" },
  { subject: "Physics", topic: "Projectile Motion (Quadratic)", difficulty: "Medium" },
];

const userResults = [
  { name: "Priya_S", badge: "Tech_Burner", xp: "3,200 XP", initials: "PS" },
  { name: "Pranav_Q", badge: "Tech_Teen", xp: "1,100 XP", initials: "PQ" },
];

const badgeResults = [
  { name: "Tech_Teen", desc: "Complete 5 lessons" },
  { name: "Tech_Burner", desc: "Complete 10 lessons" },
];

interface SearchScreenProps {
  onBack: () => void;
  onUserTap: (user: { name: string; initials: string; badge: string; xp: string }) => void;
}

const SearchScreen = ({ onBack, onUserTap }: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"topics" | "users" | "badges">("topics");
  const hasQuery = query.trim().length > 0;

  return (
    <div className="px-5 pb-8">
      {/* Search bar */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, users, badges..."
            className="w-full rounded-xl bg-input border border-border pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {!hasQuery ? (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="rounded-full bg-card border border-border px-3 py-1.5 text-xs text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-1 rounded-xl bg-input p-1 mb-4">
            {(["topics", "users", "badges"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all capitalize ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "topics" && (
            <div className="space-y-2">
              {topicResults.map((t, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.topic}</p>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                    t.difficulty === "Hard" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                  }`}>
                    {t.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-2">
              {userResults.map((u) => (
                <button
                  key={u.name}
                  onClick={() => onUserTap(u)}
                  className="flex items-center gap-3 w-full rounded-2xl border border-border bg-card p-4 text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-xs font-bold text-foreground">
                    {u.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.badge} · {u.xp}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "badges" && (
            <div className="space-y-2">
              {badgeResults.map((b) => (
                <div key={b.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="text-lg">🏆</span>
                  <div>
                    <p className="text-sm font-bold text-primary">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchScreen;
