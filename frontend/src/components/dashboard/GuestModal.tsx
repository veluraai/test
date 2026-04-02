import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface GuestModalProps {
  message: string;
  onClose: () => void;
}

const GuestModal = ({ message, onClose }: GuestModalProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-8">
      <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground">
          <X className="h-5 w-5" />
        </button>
        <div className="text-center pt-2">
          <p className="text-base font-bold text-foreground">This feature needs an account</p>
          <p className="text-sm text-muted-foreground mt-2">{message}</p>
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => { logout(); navigate("/signup"); }}
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground"
            >
              Sign Up Free
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
