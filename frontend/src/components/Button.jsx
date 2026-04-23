export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick} // ✅ OUTSIDE style
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "999px",
        background: "#A855F7",
        color: "#fff",
        border: "none",
        fontWeight: "600",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 0 12px rgba(168,85,247,0.5)",
      }}
    >
      {children}
    </button>
  );
}