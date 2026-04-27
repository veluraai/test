const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        height: "48px", // FIXED HEIGHT (important)
        padding: "0 16px", // horizontal only
        borderRadius: "999px",
        background: "#1A1A2E",
        border: "1px solid #2a2a3d",
        color: "#e9e6f7",
        outline: "none",
        fontSize: "14px",
        display: "flex",
        alignItems: "center", // vertical alignment
        boxSizing: "border-box",
        transition: "all 0.2s ease",
      }}
      onFocus={(e) => {
        e.target.style.border = "1px solid #A855F7";
        e.target.style.boxShadow = "0 0 6px rgba(168,85,247,0.3)";
      }}
      onBlur={(e) => {
        e.target.style.border = "1px solid #2a2a3d";
        e.target.style.boxShadow = "none";
      }}
    />
  );
};

export default Input;