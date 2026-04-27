const Layout = ({ children }) => {
  return (
    <div
      style={{
        background: "radial-gradient(circle at top, #151528, #0F0F1A)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          minHeight: "100vh",
          padding: "24px 16px 100px", // bottom space for nav later
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          color: "#e9e6f7",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;