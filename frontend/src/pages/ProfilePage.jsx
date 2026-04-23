import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Layout from "../components/Layout.jsx";
import BottomNav from "../components/BottomNav.jsx";

const StatCard = ({ label, value, highlight }) => (
  <div
    style={{
      flex: 1,
      background: "#181826",
      border: "1px solid #2a2a3d",
      borderRadius: "18px",
      padding: "16px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "10px", color: "#aba9b9", fontWeight: "700", letterSpacing: "1px" }}>
      {label}
    </div>
    <div
      style={{
        marginTop: "6px",
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "'Space Grotesk', sans-serif",
        color: highlight ? "#ff6e84" : "#cc97ff",
      }}
    >
      {value}
    </div>
  </div>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <Layout>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: "#A855F7", fontSize: "20px", background: "transparent", border: "none", cursor: "pointer" }}
        >
          ←
        </button>
        <h2 style={{ fontFamily: "'Space Grotesk'", color: "#A855F7" }}>Profile</h2>
        <span
          onClick={() => setOpenSettings(true)}
          style={{ cursor: "pointer", fontSize: "20px", color: "#aba9b9" }}
        >
          ⚙️
        </span>
      </div>

      {/* PROFILE HEADER */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            margin: "auto",
            border: "3px solid #A855F7",
            boxShadow: "0 0 30px rgba(168,85,247,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
          }}
        >
          👤
        </div>

        <h2 style={{ marginTop: "12px", fontFamily: "'Space Grotesk'" }}>
          [Arjun_Vortex]
        </h2>

        <div
          style={{
            marginTop: "6px",
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "rgba(168,85,247,0.2)",
            color: "#cc97ff",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          ⚡ TECH_TEEN
        </div>

        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <span style={{ background: "#181826", padding: "6px 12px", borderRadius: "999px" }}>
            Class 11
          </span>
          <span style={{ background: "#181826", padding: "6px 12px", borderRadius: "999px" }}>
            CBSE
          </span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
        <StatCard label="TOTAL XP" value="14,500" />
        <StatCard label="DAY STREAK" value="12 🔥" highlight />
        <StatCard label="COURSES" value="4" />
        <StatCard label="QUIZZES" value="32" />
      </div>

      {/* RANK PROGRESS */}
      <Card>
        <h3 style={{ fontFamily: "'Space Grotesk'" }}>Tech_Burner</h3>
        <p style={{ color: "#aba9b9", fontSize: "12px" }}>Next Rank Level</p>

        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <span style={{ color: "#cc97ff" }}>2,500 XP</span>
            <span style={{ color: "#aba9b9" }}>5,000 XP</span>
          </div>

          <div
            style={{
              height: "8px",
              background: "#0F0F1A",
              borderRadius: "999px",
              marginTop: "6px",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                background: "#A855F7",
                borderRadius: "999px",
              }}
            />
          </div>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#aba9b9", marginTop: "6px" }}>
            2,500 / 5,000 XP
          </p>
        </div>
      </Card>

      {/* PREMIUM */}
      <div
        style={{
          border: "2px dashed rgba(168,85,247,0.4)",
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "'Space Grotesk'" }}>Premium Access</h3>
        <p style={{ color: "#aba9b9", fontSize: "13px" }}>
          Unlock exclusive duels and cinematic learning modules.
        </p>

        <div style={{ marginTop: "12px" }}>
          <Button>Upgrade to Premium ✨</Button>
        </div>
      </div>

      <BottomNav />

      {/* ================= SETTINGS MODAL ================= */}
      {openSettings && (
        <div
          onClick={() => setOpenSettings(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(10px)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "85%",
              background: "#1A1A2E",
              borderRadius: "24px 24px 0 0",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <h2 style={{ fontFamily: "'Space Grotesk'" }}>Settings</h2>

            {/* ACCOUNT */}
            <Card>
              <p>Edit Profile</p>
              <p>Email & Security</p>
              <p>Change Class or Board</p>
            </Card>

            {/* PREF */}
            <Card>
              <p>Notifications</p>
              <p>Dark Mode</p>
              <p>Language</p>
            </Card>

            {/* LEGAL */}
            <Card>
              <p>Help Center</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </Card>

            <div style={{ marginTop: "10px" }}>
              <Button>Log Out</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}