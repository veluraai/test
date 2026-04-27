import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.tsx";
import Card from "../components/Card.tsx";
import Layout from "../components/layout/Layout.tsx";
import BottomNav from "../components/layout/BottomNav.tsx";

const metrics = [
  { label: "Total XP", value: "14,500", icon: "⚡" },
  { label: "Streak", value: "12 Days", icon: "🔥" },
  { label: "Badge", value: "TECH_TEEN", icon: "🏅", accent: true },
];

const weekDays = [
  { label: "M", active: true },
  { label: "T", active: true },
  { label: "W", active: true },
  { label: "T", active: true },
  { label: "F", active: true, current: true },
  { label: "S", active: false },
  { label: "S", active: false },
];

const exploreCourses = [
  {
    tag: "MATH",
    title: "Algebra Blitz",
    subtitle: "Class 11 · CBSE",
    action: "Enroll Now",
    gradient:
      "linear-gradient(180deg, rgba(52, 52, 74, 0.95) 0%, rgba(20, 20, 32, 0.98) 58%, rgba(24, 24, 38, 1) 100%)",
    accent: "#cc97ff",
    accentSoft: "rgba(204, 151, 255, 0.16)",
  },
  {
    tag: "TECH",
    title: "AI Ethics Deep Dive",
    subtitle: "College · ICSE",
    action: "Enroll Now",
    gradient:
      "linear-gradient(180deg, rgba(44, 44, 60, 0.95) 0%, rgba(20, 20, 32, 0.98) 58%, rgba(24, 24, 38, 1) 100%)",
    accent: "#ff6e84",
    accentSoft: "rgba(255, 110, 132, 0.14)",
  },
  {
    tag: "SCIENCE",
    title: "Quantum Sprints",
    subtitle: "Class 11 · CBSE",
    action: "Enroll Now",
    gradient:
      "linear-gradient(180deg, rgba(31, 31, 48, 0.95) 0%, rgba(20, 20, 32, 0.98) 58%, rgba(24, 24, 38, 1) 100%)",
    accent: "#34d399",
    accentSoft: "rgba(52, 211, 153, 0.14)",
  },
];

function SectionHeader({ title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <h2
        style={{
          margin: 0,
          color: "#e9e6f7",
          fontSize: "20px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {action ? (
        <span
          style={{
            color: "#cc97ff",
            fontSize: "11px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {action}
        </span>
      ) : null}
    </div>
  );
}

function MetricTile({ icon, label, value, accent = false }) {
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        padding: "12px 8px",
        borderRadius: "16px",
        background: accent ? "rgba(168, 85, 247, 0.08)" : "#181826",
        border: accent ? "1px solid rgba(204, 151, 255, 0.22)" : "1px solid #2a2a3d",
      }}
    >
      <div style={{ fontSize: "16px", marginBottom: "4px" }}>{icon}</div>
      <div
        style={{
          color: "#aba9b9",
          fontSize: "11px",
          fontFamily: "Manrope, sans-serif",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: accent ? "#cc97ff" : "#e9e6f7",
          fontSize: label === "Badge" ? "14px" : "17px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div
      style={{
        width: "100%",
        height: "7px",
        background: "#0f0f1a",
        borderRadius: "999px",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "999px",
          background: "linear-gradient(90deg, #9c48ea 0%, #A855F7 45%, #cc97ff 100%)",
          boxShadow: "0 0 10px rgba(168,85,247,0.45)",
        }}
      />
    </div>
  );
}

function ExploreCard({ tag, title, subtitle, action, gradient, accent, accentSoft, onClick }) {
  return (
    <div
      style={{
        minWidth: "255px",
        borderRadius: "24px",
        overflow: "hidden",
        background: "#1A1A2E",
        border: "1px solid #2a2a3d",
        boxShadow: "0 10px 24px rgba(0,0,0,0.38)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: "148px",
          background: gradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(204,151,255,0.18), transparent 28%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.08), transparent 18%), radial-gradient(circle at 65% 70%, rgba(168,85,247,0.12), transparent 28%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            padding: "5px 10px",
            borderRadius: "999px",
            background: accentSoft,
            border: `1px solid ${accent}30`,
            color: accent,
            fontSize: "10px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            backdropFilter: "blur(10px)",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            position: "absolute",
            right: "-18px",
            bottom: "-18px",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentSoft}, transparent 68%)`,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "16px",
            right: "16px",
            bottom: "14px",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "#e9e6f7",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#aba9b9",
                fontSize: "12px",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#aba9b9",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Estimated time: 15 min
          </div>
          <div
            style={{
              fontSize: "12px",
              color: accent,
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
            }}
          >
            New
          </div>
        </div>

        <button
          type="button"
          style={{
            width: "100%",
            border: `1px solid ${accent}40`,
            background: `linear-gradient(180deg, ${accentSoft}, rgba(24,24,38,0.9))`,
            color: "#e9e6f7",
            borderRadius: "999px",
            padding: "12px 14px",
            fontSize: "13px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.01), 0 0 18px ${accentSoft}`,
          }}
        >
          {action}
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage({
  username = "Arjun_Vortex",
  rank = "TECH_TEEN",
  xp = 14500,
  streakDays = 12,
  badge = "TECH_TEEN",
  overallProgress = 85,
}) {
  const navigate = useNavigate();

  const enrolledCourse = {
    subject: "Science",
    title: "Quantum Mechanics Duel",
    meta: "Class 11 · CBSE",
    progress: 60,
  };

  return (
    <Layout>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.22) 0%, rgba(24,24,38,1) 55%, rgba(36,36,52,1) 100%)",
              border: "1px solid rgba(204,151,255,0.28)",
              boxShadow: "0 0 16px rgba(168,85,247,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "22px",
            }}
          >
            👨‍🎓
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: "#e9e6f7",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "19px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Hey, {username}
            </div>
            <div
              style={{
                color: "#aba9b9",
                fontSize: "11px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {rank} rank
            </div>
          </div>
        </div>

        <div
          aria-label="Notifications"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#1A1A2E",
            border: "1px solid #2a2a3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#cc97ff",
            boxShadow: "0 8px 18px rgba(0,0,0,0.26)",
            flexShrink: 0,
            fontSize: "18px",
          }}
        >
          🔔
        </div>
      </header>

      {/* Performance */}
      <section style={{ marginTop: "10px" }}>
        <SectionHeader title="Your Performance" />
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <MetricTile icon="⚡" label="Total XP" value={xp.toLocaleString()} />
            <MetricTile icon="🔥" label="Streak" value={`${streakDays} Days`} />
            <MetricTile icon="🏅" label="Badge" value={badge} accent />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div
              style={{
                color: "#aba9b9",
                fontSize: "11px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Overall Progress
            </div>
            <div
              style={{
                color: "#cc97ff",
                fontSize: "13px",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
              }}
            >
              {overallProgress}%
            </div>
          </div>

          <ProgressBar value={overallProgress} />
        </Card>
      </section>

      {/* Enrolled course */}
      <section style={{ marginTop: "2px" }}>
        <SectionHeader title="Currently Enrolled" />
        <div
          style={{
            borderRadius: "28px",
            background:
              "linear-gradient(180deg, rgba(32, 20, 52, 0.98) 0%, rgba(24, 24, 38, 1) 50%, rgba(24, 24, 38, 1) 100%)",
            border: "1px solid rgba(204,151,255,0.16)",
            boxShadow: "0 16px 34px rgba(0,0,0,0.36)",
            padding: "18px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background: "linear-gradient(180deg, #cc97ff 0%, #A855F7 100%)",
              boxShadow: "0 0 12px rgba(168,85,247,0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-28px",
              top: "-28px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(204,151,255,0.12), transparent 68%)",
            }}
          />

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#cc97ff",
                  fontSize: "11px",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {enrolledCourse?.subject || "Science"}
              </div>
              <div
                style={{
                  color: "#e9e6f7",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "22px",
                  lineHeight: 1.05,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: "8px",
                }}
              >
                {enrolledCourse?.title || "Quantum Mechanics Duel"}
              </div>
              <div
                style={{
                  color: "#aba9b9",
                  fontSize: "12px",
                  fontFamily: "Manrope, sans-serif",
                  marginBottom: "12px",
                }}
              >
                {enrolledCourse?.meta || "Class 11 · CBSE"}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={enrolledCourse?.progress || 60} />
                </div>
                <div
                  style={{
                    color: "#aba9b9",
                    fontSize: "12px",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                    minWidth: "42px",
                    textAlign: "right",
                  }}
                >
                  {enrolledCourse?.progress || 60}%
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              style={{
                border: "none",
                outline: "none",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #A855F7 0%, #cc97ff 100%)",
                color: "#0f0f1a",
                padding: "14px 18px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                fontSize: "13px",
                boxShadow: "0 10px 22px rgba(168,85,247,0.22)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      </section>

      {/* Daily streak */}
      <section style={{ marginTop: "2px" }}>
        <SectionHeader title="Daily Streak" />
        <Card>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            {weekDays.map((day, index) => (
              <div
                key={`${day.label}-${index}`}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: day.active ? "#cc97ff" : "#242434",
                  color: day.active ? "#0f0f1a" : "#aba9b9",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 800,
                  fontSize: "12px",
                  boxShadow: day.current
                    ? "0 0 0 5px rgba(204,151,255,0.14), 0 0 18px rgba(168,85,247,0.28)"
                    : "none",
                  border: day.current ? "1px solid rgba(204,151,255,0.35)" : "1px solid transparent",
                }}
              >
                {day.label}
              </div>
            ))}
          </div>

          <div style={{ color: "#aba9b9", fontSize: "13px", fontFamily: "Manrope, sans-serif" }}>
            🔥 {streakDays} day streak — keep it going!
          </div>
        </Card>
      </section>

      {/* Explore */}
      <section style={{ marginTop: "2px" }}>
        <SectionHeader title="Explore Courses" action="View All" />
        <div
          style={{
            display: "flex",
            gap: "14px",
            overflowX: "auto",
            paddingBottom: "6px",
            scrollSnapType: "x proximity",
          }}
        >
          {exploreCourses.map((course) => (
            <ExploreCard
              key={course.title}
              tag={course.tag}
              title={course.title}
              subtitle={course.subtitle}
              action={course.action}
              gradient={course.gradient}
              accent={course.accent}
              accentSoft={course.accentSoft}
              onClick={() => navigate("/chat")}
            />
          ))}
        </div>
      </section>

      <BottomNav />
    </Layout>
  );
}