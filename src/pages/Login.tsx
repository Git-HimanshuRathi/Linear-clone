import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="lg" showText={false} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-medium text-center text-foreground">
          Log in to Linear
        </h1>

        {/* Login Options */}
        <div className="space-y-3">
          {/* Continue with Google */}
          <Button
            className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white py-6 text-base font-medium flex items-center justify-center gap-3"
            onClick={() => {
              navigate("/onboarding/welcome");
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="white"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="white"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="white"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="white"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Hint text */}
          <p className="text-xs text-foreground/60 text-center">
            You used Google to log in last time
          </p>

          {/* Continue with email */}
          <Button
            variant="secondary"
            className="w-full bg-surface hover:bg-surface-hover text-foreground py-6 text-base font-medium"
            onClick={() => {
              // Handle email login
              console.log("Email login");
            }}
          >
            Continue with email
          </Button>

          {/* Continue with SAML SSO */}
          <Button
            variant="secondary"
            className="w-full bg-surface hover:bg-surface-hover text-foreground py-6 text-base font-medium"
            onClick={() => {
              // Handle SAML SSO
              console.log("SAML SSO login");
            }}
          >
            Continue with SAML SSO
          </Button>

          {/* Log in with passkey */}
          <Button
            variant="secondary"
            className="w-full bg-surface hover:bg-surface-hover text-foreground py-6 text-base font-medium"
            onClick={() => {
              // Handle passkey login
              console.log("Passkey login");
            }}
          >
            Log in with passkey
          </Button>
        </div>

        {/* Account Creation Prompt */}
        <p className="text-sm text-foreground/70 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/onboarding/welcome")}
            className="text-foreground hover:text-foreground/80 font-medium"
          >
            Sign up
          </button>
          {" "}or{" "}
          <a
            href="#"
            className="text-foreground hover:text-foreground/80 font-medium"
          >
            learn more
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

