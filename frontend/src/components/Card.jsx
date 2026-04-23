const Card = ({ children }) => {
  return (
    <div
      style={{
        background: "#1A1A2E",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid #2a2a3d",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;