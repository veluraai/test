import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname.startsWith("/courses")) return "courses";
    if (location.pathname.startsWith("/profile")) return "profile";
    return "home";
  };

  const active = getActiveTab();

  const items = [
    { id: "home", icon: "🏠", route: "/dashboard" },
    { id: "courses", icon: "📚", route: "/courses" },
    { id: "profile", icon: "👤", route: "/profile" },
  ];

  return (
    <div    style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "400px",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderRadius: "20px",
        background: "#1A1A2E",
        border: "1px solid #2a2a3d",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(item.route)}
          style={{
            padding: "10px 16px",
            borderRadius: "999px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background:
              active === item.id
                ? "rgba(168,85,247,0.2)"
                : "transparent",
            color:
              active === item.id
                ? "#A855F7"
                : "#aba9b9",
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default BottomNav;