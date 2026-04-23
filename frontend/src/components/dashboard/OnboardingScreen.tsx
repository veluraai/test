import { useState } from "react";
import { BookOpen, Target, Zap, Trophy, ChevronRight, Check } from "lucide-react";

const allSubjects = ["Maths", "Physics", "Chemistry", "History", "CS", "Biology", "English"];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 max-w-[430px] mx-auto">
      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-8 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold text-foreground mb-2">Meet your AI personas</h1>
          <p className="text-sm text-muted-foreground mb-8">Three modes, one powerful AI</p>
          <div className="space-y-3">
            {[
              { icon: BookOpen, name: "Tutor", desc: "Step-by-step guidance on any topic" },
              { icon: Target, name: "Coach", desc: "Build focus, habits, and study plans" },
              { icon: Zap, name: "Challenger", desc: "Fast-paced quizzes to test your limits" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold text-foreground mb-2">Earn XP, win Duels</h1>
          <p className="text-sm text-muted-foreground mb-8">Climb the leaderboard and unlock badges</p>
          <div className="flex flex-col items-center gap-3">
            {["Tech_Teen", "Tech_Burner", "God_of_Logics", "Comp_Master"].map((badge, i) => (
              <div key={badge} className="flex items-center gap-3 w-full max-w-[280px]">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${i < 2 ? "bg-primary/10" : "bg-border"}`}>
                  <Trophy className={`h-5 w-5 ${i < 2 ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <p className={`text-sm font-bold ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{badge}</p>
                {i < 3 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto rotate-90" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold text-foreground mb-2">Pick your subjects</h1>
          <p className="text-sm text-muted-foreground mb-8">Select at least 1 to get started</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {allSubjects.map((s) => (
              <button
                key={s}
                onClick={() => toggleSubject(s)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  selectedSubjects.includes(s)
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                {selectedSubjects.includes(s) && <Check className="h-3.5 w-3.5" />}
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 w-full flex flex-col gap-3">
        {step < 2 ? (
          <>
            <button
              onClick={() => setStep(step + 1)}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground active:scale-[0.98] transition-transform"
            >
              Next
            </button>
            <button
              onClick={onComplete}
              className="text-xs text-muted-foreground font-medium"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            onClick={onComplete}
            disabled={selectedSubjects.length === 0}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground active:scale-[0.98] transition-transform disabled:opacity-40"
          >
            Get Started →
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreen;
