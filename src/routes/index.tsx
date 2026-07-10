import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Welcome Back" },
      { name: "description", content: "Sign in to your account with email and password." },
      { property: "og:title", content: "Login — Welcome Back" },
      { property: "og:description", content: "Sign in to your account with email and password." },
    ],
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-12 font-sans text-[#1F2937]">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#007AFF] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(0,122,255,0.25)]">
            <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[32px] font-bold tracking-tight leading-tight">Welcome Back</h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.08)]">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#374151] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@example.com"
                  className={`w-full h-11 pl-10 pr-3 text-sm rounded-md border bg-white transition-colors outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#007AFF]/20 ${
                    errors.email
                      ? "border-[#EF4444] focus:border-[#EF4444]"
                      : "border-[#E5E7EB] focus:border-[#007AFF]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#EF4444]">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#374151] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="Enter your password"
                  className={`w-full h-11 pl-10 pr-10 text-sm rounded-md border bg-white transition-colors outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#007AFF]/20 ${
                    errors.password
                      ? "border-[#EF4444] focus:border-[#EF4444]"
                      : "border-[#E5E7EB] focus:border-[#007AFF]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[#EF4444]">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E5E7EB] accent-[#007AFF] cursor-pointer"
                />
                <span className="text-[#374151]">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#007AFF] hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md bg-[#007AFF] text-white text-sm font-semibold transition-colors hover:bg-[#0051D5] active:bg-[#003FA8] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <a href="#" className="text-[#007AFF] font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
