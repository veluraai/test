import { ArrowLeft, Swords, Check, Trophy, Flame, Zap } from "lucide-react";

const notifications = [
  { id: 1, icon: "⚔️", title: "Duel Challenge!", subtitle: "Priya_S challenged you in Physics", time: "2m ago", unread: true, group: "Today" },
  { id: 2, icon: "⚡", title: "Daily Challenge Available", subtitle: "5 new questions waiting for you", time: "1h ago", unread: true, group: "Today" },
  { id: 3, icon: "🔥", title: "Keep your streak!", subtitle: "Complete a lesson today to maintain your 5-day streak", time: "3h ago", unread: false, group: "Today" },
  { id: 4, icon: "✅", title: "Duel Result: You Won!", subtitle: "You beat Kavya_R in Maths (+30 XP)", time: "Yesterday", unread: false, group: "Earlier" },
  { id: 5, icon: "🏅", title: "Badge Unlocked!", subtitle: "You earned the Tech_Burner badge", time: "3 days ago", unread: false, group: "Earlier" },
  { id: 6, icon: "⚔️", title: "Duel Result: You Lost", subtitle: "Arjun_D won the History duel", time: "4 days ago", unread: false, group: "Earlier" },
];

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen = ({ onBack }: NotificationsScreenProps) => {
  const today = notifications.filter((n) => n.group === "Today");
  const earlier = notifications.filter((n) => n.group === "Earlier");

  return (
    <div className="px-5 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        </div>
        <button className="text-xs text-primary font-medium">Mark all as read</button>
      </div>

      {[
        { label: "Today", items: today },
        { label: "Earlier", items: earlier },
      ].map((section) => (
        <div key={section.label} className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
            {section.label}
          </p>
          <div className="space-y-2">
            {section.items.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-2xl border bg-card p-4 ${
                  n.unread ? "border-l-2 border-l-primary border-border" : "border-border"
                }`}
              >
                <span className="text-lg mt-0.5">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${n.unread ? "text-foreground" : "text-foreground/80"}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.subtitle}</p>
                </div>
                <p className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsScreen;
