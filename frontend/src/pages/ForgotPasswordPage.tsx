import { useState } from "react";
import { Mail, Zap, ArrowLeft, Brain, Flame, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <style>{`
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(124,58,237,0.6)); }
          50% { filter: drop-shadow(0 0 20px rgba(124,58,237,0.9)); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes card-enter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        .grid-bg {
          background-image: 
            linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-pulse 4s ease-in-out infinite;
        }
        .logo-hex { animation: logo-glow 4s ease-in-out infinite; }
        .badge-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .card-animate { animation: card-enter 0.6s ease-out both; animation-delay: 0.2s; }
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          animation: float-particle linear infinite;
        }
      `}</style>

      <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-start px-4 py-8 sm:justify-center sm:py-0">
        <div className="grid-bg absolute inset-0 pointer-events-none" />

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10px`,
              background: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--secondary))" : "hsl(var(--accent))",
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}

        {/* Hero / Branding */}
        <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8">
          <div className="logo-hex relative w-16 h-16 mb-4 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
              <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="drop-shadow-lg" />
              <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="hsl(var(--primary))" opacity="0.15" />
            </svg>
            <Zap className="relative z-10 w-7 h-7 text-primary" />
          </div>
          <h1 className="text-[32px] font-bold text-foreground" style={{ textShadow: "0 0 30px rgba(124,58,237,0.5)" }}>
            Velura AI
          </h1>
          <p className="text-secondary text-[13px] uppercase tracking-[0.2em] mt-1 font-medium">
            Learn. Duel. Dominate.
          </p>
        </div>

        {/* Badge showcase */}
        <div className="relative z-10 mb-6 sm:mb-8 flex flex-col items-center">
          <div className="flex gap-3">
            {[
              { name: "Tech_Teen", color: "primary", icon: Brain },
              { name: "Tech_Burner", color: "secondary", icon: Flame },
              { name: "God_of_Logics", color: "badge-gold", icon: Crown },
            ].map((badge) => (
              <div
                key={badge.name}
                className={`badge-shimmer relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border ${
                  badge.color === "primary"
                    ? "border-primary/30 text-primary bg-primary/10 shadow-[0_0_12px_rgba(124,58,237,0.25)]"
                    : badge.color === "secondary"
                    ? "border-secondary/30 text-secondary bg-secondary/10 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    : "border-badge-gold/30 text-badge-gold bg-badge-gold/10 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                }`}
              >
                <badge.icon className="w-3 h-3" />
                {badge.name}
              </div>
            ))}
          </div>
        </div>

        {/* Forgot Password Card */}
        <div
          className="card-animate relative z-10 w-full max-w-[420px] rounded-[20px] px-6 py-8 sm:px-8 sm:py-9"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Forgot Password?</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  No worries, we'll send you a reset link 🔑
                </p>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-muted-foreground/60 text-[11px] uppercase tracking-[0.1em] mb-2 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-input-bg border border-surface-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                  />
                </div>
              </div>

              {/* Reset button */}
              <button
                onClick={() => setSubmitted(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-primary hover:brightness-110 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-[0.98] transition-all text-base"
              >
                <Zap className="w-5 h-5" />
                Send Reset Link
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent a password reset link to<br />
                <span className="text-foreground font-medium">{email}</span>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary text-sm font-medium hover:underline transition-all"
              >
                Didn't receive it? Try again
              </button>
            </div>
          )}
        </div>

        {/* Back to login */}
        <div className="relative z-10 mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10">
          <div
            className="h-full mx-auto"
            style={{
              maxWidth: "600px",
              background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, transparent 80%)",
              boxShadow: "0 0 15px 2px rgba(124,58,237,0.3), 0 0 30px 5px rgba(6,182,212,0.15)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
