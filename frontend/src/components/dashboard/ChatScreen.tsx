import { ArrowLeft, Mic, Send, BookOpen, Target, Zap } from "lucide-react";
import { useState } from "react";

type Persona = "tutor" | "coach" | "challenger";

const personaConfig = {
  tutor: {
    label: "Tutor",
    icon: BookOpen,
    tagline: "I'll guide you step by step. Ask me anything.",
    messages: [
      { from: "ai" as const, text: "Hey Ankur! What topic are you working on today?" },
      { from: "user" as const, text: "Can you explain quadratic equations?" },
      { from: "ai" as const, text: "Sure! A quadratic equation is any equation of the form ax² + bx + c = 0, where a ≠ 0. The key idea is that it always forms a parabola when graphed. Want me to walk through solving one?" },
      { from: "user" as const, text: "Yes please!" },
    ],
  },
  coach: {
    label: "Coach",
    icon: Target,
    tagline: "Let's build your focus and habits.",
    messages: [
      { from: "ai" as const, text: "Good to see you back! You've been consistent this week. 💪" },
      { from: "user" as const, text: "I keep getting distracted while studying." },
      { from: "ai" as const, text: "Try the 25/5 technique — 25 mins focused study, then 5 mins break. Start with your hardest subject first. Want me to set up a focus session for you?" },
      { from: "user" as const, text: "That sounds helpful, let's try it." },
    ],
  },
  challenger: {
    label: "Challenger",
    icon: Zap,
    tagline: "Think you can beat me? Let's go. ⚡",
    messages: [
      { from: "ai" as const, text: "Ready for a challenge? Let's test your speed. 🧠" },
      { from: "ai" as const, text: "What is the discriminant of 2x² + 3x - 5 = 0?" },
      {
        from: "ai" as const,
        text: "",
        options: ["A) 49", "B) -31", "C) 19", "D) -49"],
      },
      { from: "user" as const, text: "A) 49" },
    ],
  },
};

const ChatScreen = () => {
  const [persona, setPersona] = useState<Persona>("tutor");
  const [inputValue, setInputValue] = useState("");
  const config = personaConfig[persona];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="px-5 pt-2 pb-3 border-b border-border">
        <p className="text-lg font-bold text-foreground text-center">AI Tutor</p>
        {/* Persona Switcher */}
        <div className="flex gap-1 mt-3 rounded-xl bg-input p-1">
          {(["tutor", "coach", "challenger"] as Persona[]).map((p) => (
            <button
              key={p}
              onClick={() => setPersona(p)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                persona === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {personaConfig[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Persona Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground flex-1">{config.tagline}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {config.messages.map((msg, i) => (
          <div key={i}>
            {msg.from === "ai" ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card border border-border px-4 py-3 border-l-2 border-l-primary">
                  {msg.text && <p className="text-sm text-foreground">{msg.text}</p>}
                  {msg.options && (
                    <div className="space-y-2 mt-1">
                      {msg.options.map((opt, j) => (
                        <button
                          key={j}
                          className="block w-full text-left rounded-xl border border-border bg-input px-3 py-2.5 text-sm text-foreground hover:border-primary transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                  <p className="text-sm text-primary-foreground">{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="px-4 py-3 border-t border-border flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask Velura..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mic className="h-5 w-5" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
