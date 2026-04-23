import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Layout from "../components/Layout.jsx";

const tutorSuggestions = [
  "Explain Schrödinger",
  "Practice Quiz",
  "Real-world examples",
];

const challengerOptions = [
  { id: "A", text: "It becomes zero" },
  { id: "B", text: "It remains constant" },
  { id: "C", text: "It becomes infinitely uncertain" },
  { id: "D", text: "It depends on the observer" },
];

const waveBars = [18, 42, 26, 58, 36, 62, 48, 74, 52, 64, 38, 28];

function SectionTag({ icon, title, accent = "#cc97ff", tone = "default" }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        borderRadius: "999px",
        background:
          tone === "challenger"
            ? "rgba(255,110,132,0.08)"
            : "rgba(168,85,247,0.08)",
        border:
          tone === "challenger"
            ? "1px solid rgba(255,110,132,0.18)"
            : "1px solid rgba(204,151,255,0.18)",
      }}
    >
      <span
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            tone === "challenger"
              ? "rgba(255,110,132,0.12)"
              : "rgba(204,151,255,0.12)",
          color: accent,
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: accent,
          fontSize: "11px",
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function ModePill({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        cursor: "pointer",
        padding: "14px 14px",
        borderRadius: "999px",
        background: active
          ? "linear-gradient(135deg, rgba(168,85,247,0.24), rgba(156,72,234,0.46))"
          : "#0F0F1A",
        color: active ? "#cc97ff" : "#aba9b9",
        border: active ? "1px solid rgba(204,151,255,0.28)" : "1px solid #2a2a3d",
        boxShadow: active ? "0 0 18px rgba(168,85,247,0.16)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "Manrope, sans-serif",
        fontSize: "13px",
        fontWeight: 800,
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Bubble({ role = "assistant", children, label, subtle = false }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "88%",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {label ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: isUser ? "0" : "4px",
            marginRight: isUser ? "4px" : "0",
            alignSelf: isUser ? "flex-end" : "flex-start",
          }}
        >
          {!isUser ? (
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.28), rgba(204,151,255,0.12))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#cc97ff",
                fontSize: "12px",
                boxShadow: "0 0 16px rgba(168,85,247,0.2)",
              }}
            >
              {subtle ? "✦" : "⌁"}
            </div>
          ) : null}
          <span
            style={{
              color: isUser ? "#aba9b9" : subtle ? "#ff6e84" : "#cc97ff",
              fontSize: "10px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        </div>
      ) : null}

      <div
        style={{
          background: isUser
            ? "linear-gradient(135deg, rgba(168,85,247,0.92), rgba(204,151,255,0.84))"
            : subtle
              ? "linear-gradient(180deg, rgba(255,110,132,0.08), rgba(24,24,38,0.98))"
              : "#181826",
          color: isUser ? "#0f0f1a" : "#e9e6f7",
          border: isUser
            ? "1px solid rgba(255,255,255,0.08)"
            : subtle
              ? "1px solid rgba(255,110,132,0.18)"
              : "1px solid #2a2a3d",
          borderRadius: "22px",
          borderTopLeftRadius: isUser ? "22px" : "8px",
          borderTopRightRadius: isUser ? "8px" : "22px",
          padding: "16px 16px",
          boxShadow: isUser
            ? "0 8px 20px rgba(168,85,247,0.22)"
            : subtle
              ? "0 0 0 1px rgba(255,110,132,0.03)"
              : "none",
          lineHeight: 1.6,
          fontSize: "14px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function QuickChip({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flexShrink: 0,
        border: "1px solid #2a2a3d",
        background: "#181826",
        color: "#aba9b9",
        borderRadius: "999px",
        padding: "9px 14px",
        fontSize: "11px",
        fontFamily: "Manrope, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function OptionCard({ id, text, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      style={{
        width: "100%",
        padding: "16px",
        borderRadius: "999px",
        border: selected ? "1px solid rgba(204,151,255,0.42)" : "1px solid #2a2a3d",
        background: selected ? "rgba(168,85,247,0.12)" : "#181826",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: selected ? "0 0 18px rgba(168,85,247,0.12)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: selected ? "#cc97ff" : "#242434",
            color: selected ? "#0f0f1a" : "#aba9b9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "12px",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {id}
        </div>
        <div
          style={{
            color: selected ? "#e9e6f7" : "#aba9b9",
            fontSize: "14px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
          }}
        >
          {text}
        </div>
      </div>
    </button>
  );
}

function VoiceBars() {
  return (
    <div style={{ display: "flex", alignItems: "end", gap: "6px", height: "34px" }}>
      {waveBars.map((h, i) => (
        <div
          key={i}
          style={{
            width: "5px",
            height: `${h}px`,
            borderRadius: "999px",
            background:
              i % 3 === 0
                ? "rgba(204,151,255,0.35)"
                : i % 3 === 1
                  ? "rgba(168,85,247,0.58)"
                  : "rgba(204,151,255,0.2)",
            boxShadow: "0 0 12px rgba(168,85,247,0.12)",
          }}
        />
      ))}
    </div>
  );
}

function VoiceOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(5,5,10,0.78)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(100%, 440px)",
          minHeight: "82vh",
          borderRadius: "30px",
          background:
            "radial-gradient(circle at 50% 25%, rgba(168,85,247,0.20), rgba(24,24,38,0.98) 42%, rgba(15,15,26,1) 100%)",
          border: "1px solid rgba(204,151,255,0.14)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          padding: "18px 18px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#A855F7", fontSize: "18px" }}>←</span>
            <div>
              <div
                style={{
                  color: "#cc97ff",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Voice Mode · Chapter 1: Quantum Dynamics
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid #2a2a3d",
              background: "#181826",
              color: "#aba9b9",
            }}
          >
            i
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.18), transparent 22%), radial-gradient(circle at 55% 65%, rgba(168,85,247,0.22), transparent 28%), linear-gradient(135deg, rgba(168,85,247,0.72), rgba(204,151,255,0.62))",
              boxShadow: "0 0 90px 24px rgba(168,85,247,0.18)",
              filter: "saturate(1.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.14) 52%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.1) 100%)",
                opacity: 0.24,
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#cc97ff",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              • Tutor is speaking...
            </div>
            <div
              style={{
                maxWidth: "340px",
                color: "#aba9b9",
                fontSize: "18px",
                lineHeight: 1.6,
                fontFamily: "Manrope, sans-serif",
                opacity: 0.85,
              }}
            >
              “The Heisenberg Uncertainty Principle suggests that we cannot simultaneously know both the position and momentum of a particle with absolute precision...”
            </div>
            <div
              style={{
                width: "50px",
                height: "1px",
                background: "#2a2a3d",
                margin: "18px auto 12px",
              }}
            />
            <div style={{ color: "#aba9b9", opacity: 0.55, fontStyle: "italic" }}>
              Transcribing...
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", gap: "14px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                borderRadius: "999px",
                padding: "16px",
                background: "#151521",
                color: "#aba9b9",
                border: "1px solid #2a2a3d",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                letterSpacing: "0.06em",
              }}
            >
              Mute
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                borderRadius: "999px",
                padding: "16px",
                background: "linear-gradient(135deg, #ff7890, #ff6e84)",
                color: "#0f0f1a",
                border: "none",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 900,
                letterSpacing: "0.06em",
                boxShadow: "0 0 20px rgba(255,110,132,0.22)",
              }}
            >
              End Session
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <VoiceBars />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage({
  chapterTitle = "Chapter 4: Quantum Mechanics",
  chapterMeta = "Physics · Class 12 · CBSE",
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("tutor");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("C");
  const [composerText, setComposerText] = useState("");

  const modeLabel = useMemo(
    () => (mode === "tutor" ? "LUMINA AI • TUTOR" : "LUMINA AI • CHALLENGER"),
    [mode]
  );

  return (
    <Layout>
      <style>{`
        @keyframes chatFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .chat-float {
          animation: chatFloat 5s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            paddingTop: "2px",
            paddingBottom: "10px",
          }}
        >
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate(-1)}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid #2a2a3d",
              background: "#12121e",
              color: "#cc97ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "18px",
            }}
          >
            ←
          </button>

          <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
            <div
              style={{
                color: "#e9e6f7",
                fontSize: "19px",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {chapterTitle}
            </div>
            <div
              style={{
                marginTop: "4px",
                color: "#aba9b9",
                fontSize: "11px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {chapterMeta}
            </div>
          </div>

          <button
            type="button"
            aria-label="Info"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid #2a2a3d",
              background: "#12121e",
              color: "#aba9b9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "18px",
            }}
          >
            i
          </button>
        </header>

        {/* Mode switcher */}
        <section style={{ paddingTop: "8px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "4px",
              borderRadius: "999px",
              background: "#0F0F1A",
              border: "1px solid #2a2a3d",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.01)",
            }}
          >
            <ModePill
              active={mode === "tutor"}
              icon="🧠"
              label="Tutor Mode"
              onClick={() => setMode("tutor")}
            />
            <ModePill
              active={mode === "challenger"}
              icon="⚔"
              label="Challenger Mode"
              onClick={() => setMode("challenger")}
            />
          </div>
        </section>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            paddingTop: "18px",
            paddingBottom: mode === "tutor" ? "250px" : "290px",
          }}
        >
          {mode === "tutor" ? (
            <>
              <SectionTag
                icon="✦"
                title="Lumina AI • Tutor"
                accent="#ff6e84"
                tone="default"
              />

              <Bubble role="assistant" label={modeLabel}>
                Hey Alex! Let&apos;s dive into Quantum Mechanics. I&apos;ll explain everything step by step.
                Ask me anything anytime 🧠
              </Bubble>

              <div style={{ color: "#aba9b9", fontSize: "10px", marginTop: "-6px" }}>
                Just now
              </div>

              <Bubble role="assistant">
                Would you like to start with the concept of{" "}
                <span style={{ color: "#cc97ff", fontWeight: 800 }}>
                  Wave-Particle Duality
                </span>{" "}
                or jump straight into the{" "}
                <span style={{ color: "#cc97ff", fontWeight: 800 }}>
                  Schrödinger Equation
                </span>
                ?
              </Bubble>

              <Bubble role="user">
                Tell me about Wave-Particle Duality in simple terms!
              </Bubble>

              <Bubble role="assistant">
                Think of it like a video game character that can switch between two forms.
                <br />
                <br />
                Sometimes light behaves like a{" "}
                <span style={{ color: "#cc97ff", textDecoration: "underline", textDecorationColor: "rgba(204,151,255,0.28)", textUnderlineOffset: "4px" }}>
                  Bullet (Particle)
                </span>{" "}
                hitting a target, and other times it spreads out like a{" "}
                <span style={{ color: "#cc97ff", textDecoration: "underline", textDecorationColor: "rgba(204,151,255,0.28)", textUnderlineOffset: "4px" }}>
                  Ripple (Wave)
                </span>{" "}
                in a lake. 🌊
              </Bubble>

              <Card>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(180deg, rgba(32,20,52,0.98) 0%, rgba(18,18,30,1) 40%, rgba(24,24,38,1) 100%)",
                    border: "1px solid #2a2a3d",
                    position: "relative",
                    minHeight: "250px",
                    padding: "18px 16px 14px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at 20% 30%, rgba(204,151,255,0.18), transparent 24%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.12), transparent 18%), radial-gradient(circle at 50% 60%, rgba(255,255,255,0.06), transparent 26%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -52%)",
                      width: "88%",
                      height: "84px",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, rgba(204,151,255,0.04), rgba(204,151,255,0.18), rgba(168,85,247,0.05))",
                      filter: "blur(10px)",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "999px",
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#ff6e84",
                          background: "rgba(255,110,132,0.08)",
                          border: "1px solid rgba(255,110,132,0.16)",
                        }}
                      >
                        Visual Aid
                      </span>
                      <span
                        style={{
                          color: "#aba9b9",
                          fontSize: "11px",
                          fontStyle: "italic",
                        }}
                      >
                        Fig 1.1: Double-slit interference
                      </span>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "10px 6px 6px",
                      }}
                    >
                      {waveBars.map((h, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: "7px",
                            height: `${h + 18}px`,
                            borderRadius: "999px",
                            background:
                              idx % 4 === 0
                                ? "rgba(204,151,255,0.86)"
                                : idx % 4 === 1
                                  ? "rgba(168,85,247,0.72)"
                                  : idx % 4 === 2
                                    ? "rgba(204,151,255,0.46)"
                                    : "rgba(255,255,255,0.16)",
                            boxShadow: "0 0 16px rgba(168,85,247,0.16)",
                            transform: idx % 3 === 0 ? "translateY(-2px)" : "translateY(0)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "2px" }}>
                {tutorSuggestions.map((chip) => (
                  <QuickChip
                    key={chip}
                    onClick={() => setComposerText(chip)}
                  >
                    {chip}
                  </QuickChip>
                ))}
              </div>
            </>
          ) : (
            <>
              <SectionTag
                icon="✦"
                title="Lumina AI • Challenger"
                accent="#ff6e84"
                tone="challenger"
              />

              <Bubble role="assistant" subtle label="Lumina AI • Challenger">
                Alright <span style={{ color: "#cc97ff", fontWeight: 800 }}>Explorer</span>! Tutor&apos;s done talking.
                Now let&apos;s see what you actually learned ⚔
              </Bubble>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "-4px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(204,151,255,0.12)",
                    color: "#cc97ff",
                    fontSize: "11px",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  🏅 100 XP Reward
                </div>
              </div>

              <Card>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <div
                      style={{
                        color: "#cc97ff",
                        fontSize: "12px",
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      Question 1
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#cc97ff",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 800,
                        fontSize: "20px",
                        lineHeight: 1.24,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      What happens to the precision of momentum measurement if the position is measured with infinite precision?
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {challengerOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        id={option.id}
                        text={option.text}
                        selected={selectedAnswer === option.id}
                        onClick={setSelectedAnswer}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              <div
                style={{
                  textAlign: "center",
                  color: "#aba9b9",
                  fontSize: "10px",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  paddingTop: "6px",
                }}
              >
                Heisenberg Protocol Active
              </div>
            </>
          )}
        </main>

        {/* Bottom shell */}
        <footer
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 0,
            width: "min(100%, 480px)",
            zIndex: 30,
            padding: "0 16px 16px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              borderRadius: "26px",
              background: "linear-gradient(180deg, rgba(24,24,38,0.92), rgba(15,15,26,0.98))",
              border: "1px solid rgba(42,42,61,0.9)",
              boxShadow: "0 -14px 36px rgba(0,0,0,0.32)",
              backdropFilter: "blur(14px)",
              padding: "12px",
            }}
          >
            {mode === "tutor" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#242434",
                    border: "1px solid #2a2a3d",
                    borderRadius: "999px",
                    padding: "8px 10px 8px 12px",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Attach"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      color: "#aba9b9",
                      flexShrink: 0,
                      fontSize: "18px",
                    }}
                  >
                    ⊕
                  </button>

                  <input
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder="Ask your Tutor anything..."
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#e9e6f7",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setVoiceOpen(true)}
                    aria-label="Voice mode"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      color: "#aba9b9",
                      flexShrink: 0,
                      fontSize: "18px",
                    }}
                  >
                    🎙
                  </button>

                  <button
                    type="button"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#A855F7",
                      color: "#0f0f1a",
                      flexShrink: 0,
                      fontSize: "16px",
                      boxShadow: "0 0 16px rgba(168,85,247,0.18)",
                    }}
                  >
                    →
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
                  {tutorSuggestions.map((chip) => (
                    <QuickChip
                      key={`bottom-${chip}`}
                      onClick={() => setComposerText(chip)}
                    >
                      {chip}
                    </QuickChip>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#242434",
                    border: "1px solid #2a2a3d",
                    borderRadius: "999px",
                    padding: "8px 10px 8px 12px",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Explain reasoning"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      color: "#aba9b9",
                      flexShrink: 0,
                      fontSize: "18px",
                    }}
                  >
                    ⎙
                  </button>

                  <input
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder="Explain your reasoning..."
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#e9e6f7",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setVoiceOpen(true)}
                    aria-label="Voice mode"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      color: "#aba9b9",
                      flexShrink: 0,
                      fontSize: "18px",
                    }}
                  >
                    🎙
                  </button>

                  <button
                    type="button"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#A855F7",
                      color: "#0f0f1a",
                      flexShrink: 0,
                      fontSize: "16px",
                      boxShadow: "0 0 16px rgba(168,85,247,0.18)",
                    }}
                  >
                    →
                  </button>
                </div>

                <Button onClick={() => setSelectedAnswer("C")}>SUBMIT ANSWER ✦</Button>
              </div>
            )}
          </div>
        </footer>

        {voiceOpen ? <VoiceOverlay onClose={() => setVoiceOpen(false)} /> : null}
      </div>
    </Layout>
  );
}