import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Layout from "../components/Layout.jsx";
import Input from "../components/Input.jsx";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [board, setBoard] = useState("CBSE");
  const [selectedClass, setSelectedClass] = useState("Class 11");

  const boards = [
    { title: "CBSE", desc: "Central Board of Secondary Education" },
    { title: "ICSE", desc: "Indian Certificate of Secondary Education" },
    { title: "Other", desc: "State Boards or International" },
  ];

  const classes = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "College",
  ];

  return (
    <Layout>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1
          style={{
            fontFamily: "Space Grotesk",
            letterSpacing: "2px",
            color: "#cc97ff",
            fontSize: "18px",
          }}
        >
          VELURA AI
        </h1>

        {/* PROGRESS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
          <div style={{ width: "20px", height: "4px", background: "#A855F7", borderRadius: "999px" }} />
          <div style={{ width: "20px", height: "4px", background: "#2a2a3d", borderRadius: "999px" }} />
          <div style={{ width: "20px", height: "4px", background: "#2a2a3d", borderRadius: "999px" }} />
        </div>
      </div>

      {/* AVATAR */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "2px solid rgba(168,85,247,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            background: "#181826",
            boxShadow: "0 0 20px rgba(168,85,247,0.2)",
          }}
        >
          👤
        </div>
      </div>

      {/* NAME */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "20px" }}>
          What should we call you?
        </h2>
        <p style={{ fontSize: "13px", color: "#aba9b9" }}>
          This is your identity on the leaderboard.
        </p>

        <div style={{ marginTop: "10px" }}>
          <Input
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* BOARD */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "20px" }}>
          What board are you in?
        </h2>
        <p style={{ fontSize: "13px", color: "#aba9b9" }}>
          We tailor content based on your curriculum.
        </p>

        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {boards.map((item) => (
            <div
              key={item.title}
              onClick={() => setBoard(item.title)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "#181826",
                border:
                  board === item.title
                    ? "1px solid #A855F7"
                    : "1px solid #2a2a3d",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div>
                <div style={{ fontWeight: "600" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#aba9b9" }}>
                  {item.desc}
                </div>
              </div>

              {board === item.title && (
                <div style={{ color: "#A855F7" }}>✔</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CLASS */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "20px" }}>
          Which class are you in?
        </h2>
        <p style={{ fontSize: "13px", color: "#aba9b9" }}>
          Select your level.
        </p>

        <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {classes.map((cls) => (
            <div
              key={cls}
              onClick={() => setSelectedClass(cls)}
              style={{
                padding: "14px",
                borderRadius: "999px",
                textAlign: "center",
                cursor: "pointer",
                background:
                  selectedClass === cls ? "rgba(168,85,247,0.2)" : "#181826",
                border:
                  selectedClass === cls
                    ? "1px solid #A855F7"
                    : "1px solid #2a2a3d",
                color:
                  selectedClass === cls ? "#cc97ff" : "#e9e6f7",
              }}
            >
              {cls}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => navigate("/dashboard")}> 
          Continue →
        </Button>
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          padding: "16px",
          background: "#181826",
          borderRadius: "16px",
          color: "#aba9b9",
        }}
      >
        <p style={{ fontStyle: "italic", color: "#e9e6f7" }}>
          "Learn. Duel. Dominate."
        </p>
        <p style={{ fontSize: "12px" }}>
          Join thousands of students
        </p>
      </div>
    </Layout>
  );
}