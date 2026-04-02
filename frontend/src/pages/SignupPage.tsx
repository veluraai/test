import { useState } from "react";
import { User, Lock, Eye, EyeOff, Zap, Mail, Brain, Flame, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../../backend/src/supabase";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("signup");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email to confirm your account.');
    }

    setLoading(false);
  };

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

        {/* Signup Card */}
        <div
          className="card-animate relative z-10 w-full max-w-[420px] rounded-[20px] px-6 py-8 sm:px-8 sm:py-9"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Start your journey today 🚀
            </p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-muted-foreground/60 text-[11px] uppercase tracking-[0.1em] mb-2 font-medium">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full bg-input-bg border border-surface-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
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

          {/* Password */}
          <div className="mb-4">
            <label className="block text-muted-foreground/60 text-[11px] uppercase tracking-[0.1em] mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-input-bg border border-surface-border rounded-xl py-3.5 pl-11 pr-12 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-muted-foreground/60 text-[11px] uppercase tracking-[0.1em] mb-2 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-input-bg border border-surface-border rounded-xl py-3.5 pl-11 pr-12 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mb-6">
            <button
              type="button"
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 ${
                agreeTerms ? "bg-primary border-primary" : "border-surface-border bg-transparent"
              }`}
            >
              {agreeTerms && (
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className="text-muted-foreground text-xs leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </span>
          </div>

          {/* Signup button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-primary hover:brightness-110 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-[0.98] transition-all text-base"
          >
            <Zap className="w-5 h-5" />
            {loading ? 'Loading...' : 'Create Account'}
          </button>

          {error && <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{error}</p>}
          {message && <p style={{ color: 'green', marginTop: '8px', fontSize: '14px' }}>{message}</p>}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-muted-foreground text-xs">OR</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          {/* Google button */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-gray-900 font-medium text-sm hover:bg-gray-100 active:scale-[0.98] transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Login redirect */}
        <div className="relative z-10 mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-bold hover:underline">
              Login
            </Link>
          </p>
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

export default SignupPage;
