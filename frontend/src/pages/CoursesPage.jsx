import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Layout from "../components/Layout.jsx";
import BottomNav from "../components/BottomNav.jsx";

const filterTabs = ["All", "Math", "Science", "Coding", "Logic"];

const myCourses = [
  {
    id: 1,
    category: "Coding",
    title: "Advanced Python Architectures",
    meta: "68% Complete • Next: Decorators",
    progress: 68,
    accent: "#cc97ff",
    accentSoft: "rgba(204,151,255,0.15)",
    icon: "⌘",
    cta: "Continue",
  },
  {
    id: 2,
    category: "Science",
    title: "Quantum Theory Basics",
    meta: "12% Complete • Next: Wave Functions",
    progress: 12,
    accent: "#ff6e84",
    accentSoft: "rgba(255,110,132,0.14)",
    icon: "⚛",
    cta: "Continue",
  },
];

const exploreCourses = [
  {
    id: 1,
    category: "Coding",
    label: "Advanced",
    title: "Neural Network Design",
    description:
      "Master the architecture of modern AI systems using deep learning principles and tensor manipulation.",
    accent: "#cc97ff",
    accentSoft: "rgba(204,151,255,0.16)",
    action: "Enroll Now",
    duration: "12 Hours",
    background:
      "linear-gradient(180deg, rgba(30, 30, 45, 0.96) 0%, rgba(18, 18, 30, 0.98) 58%, rgba(24, 24, 38, 1) 100%)",
  },
  {
    id: 2,
    category: "Math",
    label: "Beginner",
    title: "Discrete Mathematics",
    description:
      "The foundation of computer science. Logic, set theory, and graph theory for future engineers.",
    accent: "#ff7aa6",
    accentSoft: "rgba(255,122,166,0.14)",
    action: "Enroll Now",
    duration: "12 Hours",
    background:
      "linear-gradient(180deg, rgba(29, 29, 48, 0.96) 0%, rgba(18, 18, 30, 0.98) 58%, rgba(24, 24, 38, 1) 100%)",
  },
];

function SectionHeader({ title, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#e9e6f7",
        }}
      >
        {title}
      </h2>
      {action ? (
        <span
          style={{
            color: "#aba9b9",
            fontSize: "11px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {action}
        </span>
      ) : null}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flexShrink: 0,
        border: "none",
        outline: "none",
        cursor: "pointer",
        padding: "10px 16px",
        borderRadius: "999px",
        background: active ? "#cc97ff" : "#1A1A2E",
        color: active ? "#0f0f1a" : "#aba9b9",
        fontFamily: "Manrope, sans-serif",
        fontSize: "12px",
        fontWeight: 800,
        letterSpacing: "-0.01em",
        boxShadow: active ? "0 0 16px rgba(204,151,255,0.24)" : "none",
        border: active ? "1px solid rgba(255,255,255,0.05)" : "1px solid #2a2a3d",
      }}
    >
      {label}
    </button>
  );
}

function ProgressBar({ value, accent }) {
  return (
    <div
      style={{
        width: "100%",
        height: "6px",
        borderRadius: "999px",
        background: "#2a2a3d",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "999px",
          background: accent,
          boxShadow: "0 0 10px rgba(168,85,247,0.35)",
        }}
      />
    </div>
  );
}

function MyCourseCard({ course, onContinue }) {
  return (
    <Card>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: course.accentSoft,
            border: `1px solid ${course.accent}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: course.accent,
            fontSize: "20px",
            flexShrink: 0,
            boxShadow: `0 0 16px ${course.accentSoft}`,
          }}
        >
          {course.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: course.accent,
              fontSize: "11px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            {course.category}
          </div>

          <div
            style={{
              color: "#e9e6f7",
              fontSize: "18px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            {course.title}
          </div>

          <div
            style={{
              color: "#aba9b9",
              fontSize: "12px",
              fontFamily: "Manrope, sans-serif",
              marginBottom: "12px",
            }}
          >
            {course.meta}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <ProgressBar
                value={course.progress}
                accent={`linear-gradient(90deg, ${course.accent} 0%, #A855F7 100%)`}
              />
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
              {course.progress}%
            </div>
          </div>

          <div style={{ marginTop: "12px" }}>
            <Button onClick={onContinue}>{course.cta} ▶</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ExploreCard({ course, onClick }) {
  return (
    <div
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        background: "#1A1A2E",
        border: "1px solid #2a2a3d",
        boxShadow: "0 12px 24px rgba(0,0,0,0.34)",
      }}
    >
      <div
        style={{
          minHeight: "180px",
          background: course.background,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 18%, rgba(204,151,255,0.20), transparent 24%), radial-gradient(circle at 82% 22%, rgba(255,255,255,0.08), transparent 18%), radial-gradient(circle at 55% 72%, rgba(168,85,247,0.10), transparent 28%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            padding: "5px 10px",
            borderRadius: "999px",
            background: course.accentSoft,
            border: `1px solid ${course.accent}30`,
            color: course.accent,
            fontSize: "10px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            backdropFilter: "blur(10px)",
          }}
        >
          {course.label}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <div
          style={{
            color: "#e9e6f7",
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "19px",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          {course.title}
        </div>

        <div
          style={{
            color: "#aba9b9",
            fontSize: "12px",
            fontFamily: "Manrope, sans-serif",
            lineHeight: 1.55,
            marginBottom: "14px",
          }}
        >
          {course.description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              color: "#aba9b9",
              fontSize: "12px",
              fontFamily: "Manrope, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "13px" }}>◉</span>
            {course.duration}
          </div>

          <button
            type="button"
            onClick={onClick}
            style={{
              borderRadius: "999px",
              border: `1px solid ${course.accent}30`,
              background: "rgba(168,85,247,0.08)",
              color: course.accent,
              padding: "10px 14px",
              fontFamily: "Manrope, sans-serif",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: `0 0 14px ${course.accentSoft}`,
              whiteSpace: "nowrap",
            }}
          >
            {course.action}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [subject, setSubject] = useState("STEM");
  const [focusTopic, setFocusTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Adept");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleMyCourses = useMemo(() => {
    return myCourses.filter((course) => {
      const matchesFilter = activeFilter === "All" || course.category === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, normalizedQuery]);

  const visibleExploreCourses = useMemo(() => {
    return exploreCourses.filter((course) => {
      const matchesFilter = activeFilter === "All" || course.category === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, normalizedQuery]);

  const navigate = useNavigate();

  return (
    <Layout>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(24,24,38,1) 55%, rgba(36,36,52,1) 100%)",
              border: "1px solid rgba(204,151,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              boxShadow: "0 0 14px rgba(168,85,247,0.15)",
              flexShrink: 0,
            }}
          >
            🎓
          </div>
          <div
            style={{
              color: "#cc97ff",
              fontSize: "18px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Velura AI
          </div>
        </div>

        <button
          type="button"
          aria-label="Search"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #2a2a3d",
            background: "#1A1A2E",
            color: "#cc97ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 8px 18px rgba(0,0,0,0.24)",
          }}
        >
          🔎
        </button>
      </header>

      <section>
        <h1
          style={{
            margin: "12px 0 14px",
            color: "#e9e6f7",
            fontSize: "28px",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Courses
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#181826",
            border: "1px solid #2a2a3d",
            borderRadius: "999px",
            padding: "0 16px",
            minHeight: "52px",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          <span style={{ fontSize: "17px", color: "#757482", flexShrink: 0 }}>⌕</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for neural knowledge..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#e9e6f7",
              fontSize: "13px",
              fontFamily: "Manrope, sans-serif",
            }}
          />
        </div>
      </section>

      <section style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "2px" }}>
        {filterTabs.map((tab) => (
          <FilterPill
            key={tab}
            label={tab}
            active={activeFilter === tab}
            onClick={() => setActiveFilter(tab)}
          />
        ))}
      </section>

      <section>
        <SectionHeader title="My Courses" action="Active Focus" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
          {visibleMyCourses.map((course) => (
            <MyCourseCard
              key={course.id}
              course={course}
              onContinue={() => navigate("/chat")}
            />
          ))}
          {visibleMyCourses.length === 0 ? (
            <Card>
              <div style={{ color: "#aba9b9", fontSize: "13px", fontFamily: "Manrope, sans-serif" }}>
                No matching courses right now.
              </div>
            </Card>
          ) : null}
        </div>
      </section>

      <section>
        <SectionHeader title="Explore Courses" action="New Arriving" />
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
          {visibleExploreCourses.map((course) => (
            <ExploreCard
              key={course.id}
              course={course}
              onClick={() => navigate("/chat")}
            />
          ))}
          {visibleExploreCourses.length === 0 ? (
            <Card>
              <div style={{ color: "#aba9b9", fontSize: "13px", fontFamily: "Manrope, sans-serif" }}>
                Nothing matches your filter yet.
              </div>
            </Card>
          ) : null}
        </div>
      </section>

      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "108px",
          width: "min(100%, 420px)",
          padding: "0 16px",
          zIndex: 20,
        }}
      >
        <Button onClick={() => setBuilderOpen(true)}>＋ Generate My Course</Button>
      </div>

      {builderOpen ? (
        <div
          onClick={() => setBuilderOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(100%, 420px)",
              background: "linear-gradient(180deg, #1A1A2E 0%, #151522 100%)",
              borderRadius: "28px 28px 22px 22px",
              border: "1px solid rgba(204,151,255,0.14)",
              boxShadow: "0 -20px 50px rgba(0,0,0,0.45)",
              padding: "18px 16px 16px",
              maxHeight: "82vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "5px",
                borderRadius: "999px",
                background: "#2a2a3d",
                margin: "0 auto 14px",
              }}
            />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <div>
                <div
                  style={{
                    color: "#cc97ff",
                    fontSize: "10px",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Create Your Learning Mission
                </div>
                <h3
                  style={{
                    margin: 0,
                    color: "#e9e6f7",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Tell Velura what you want to master.
                </h3>
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#aba9b9",
                    fontSize: "12px",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Tailored to your recent progress and neural learning patterns.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBuilderOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid #2a2a3d",
                  background: "#181826",
                  color: "#aba9b9",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "18px" }}>
              <div>
                <div
                  style={{
                    color: "#cc97ff",
                    fontSize: "10px",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  What topic do you want to learn?
                </div>
                <Input
                  placeholder="e.g. Advanced Quantum Computing"
                  value={focusTopic}
                  onChange={(e) => setFocusTopic(e.target.value)}
                />
              </div>

              <div>
                <div
                  style={{
                    color: "#cc97ff",
                    fontSize: "10px",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Subject
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {["STEM", "Arts", "Tech"].map((item) => {
                    const active = subject === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSubject(item)}
                        style={{
                          borderRadius: "16px",
                          padding: "12px 10px",
                          border: active ? "1px solid rgba(204,151,255,0.42)" : "1px solid #2a2a3d",
                          background: active ? "rgba(204,151,255,0.14)" : "#181826",
                          color: active ? "#cc97ff" : "#aba9b9",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "12px",
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: "#cc97ff",
                    fontSize: "10px",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Difficulty Level
                </div>
                <div
                  style={{
                    display: "flex",
                    background: "#0f0f1a",
                    borderRadius: "999px",
                    padding: "4px",
                    border: "1px solid #2a2a3d",
                  }}
                >
                  {["Beginner", "Intermediate", "Advanced"].map((item) => {
                    const active = difficulty === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setDifficulty(item)}
                        style={{
                          flex: 1,
                          border: "none",
                          borderRadius: "999px",
                          padding: "10px 8px",
                          background: active ? "#A855F7" : "transparent",
                          color: active ? "#0f0f1a" : "#aba9b9",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "12px",
                          fontWeight: 800,
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "18px",
                  background: "rgba(255,110,132,0.08)",
                  border: "1px solid rgba(255,110,132,0.12)",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "rgba(255,110,132,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  ✦
                </div>
                <div>
                  <div
                    style={{
                      color: "#e9e6f7",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      marginBottom: "2px",
                    }}
                  >
                    AI Customization Active
                  </div>
                  <div
                    style={{
                      color: "#aba9b9",
                      fontSize: "12px",
                      fontFamily: "Manrope, sans-serif",
                      lineHeight: 1.45,
                    }}
                  >
                    This mission will be tailored to your recent progress and learning patterns.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "18px" }}>
              <Button
                onClick={() => {
                  setBuilderOpen(false);
                  navigate("/chat");
                }}
              >
                Generate Mission →
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <BottomNav />
    </Layout>
  );
}