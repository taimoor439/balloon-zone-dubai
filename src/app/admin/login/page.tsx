// Demo admin login. Credentials: admin / admin123. The session is kept in
// sessionStorage only — this is a demo gate, not real security.
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/admin";

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <p className="font-serif text-3xl text-pine-900 text-center">🎈 Balloon Zone Dubai</p>
        <p className="text-center text-sm text-stone-600 mt-1">Admin login</p>
        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
          <strong>Demo admin</strong> — data stays in this browser (localStorage),
          there is no backend and no real security. Demo credentials are{" "}
          <code className="font-semibold">admin / admin123</code>.
        </div>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (loginAdmin(user, pass)) {
              router.push("/admin");
            } else {
              setError("Wrong username or password. Try admin / admin123.");
            }
          }}
        >
          {error && (
            <p className="text-sm text-burgundy bg-red-50 border border-red-200 rounded-xl px-3 py-2" role="alert">
              {error}
            </p>
          )}
          <div>
            <label className="text-sm font-semibold" htmlFor="admin-user">Username</label>
            <input
              id="admin-user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              placeholder="admin"
              className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:border-pine-600"
            />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="admin-pass">Password</label>
            <input
              id="admin-pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:border-pine-600"
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-pine-800 text-white py-3 font-semibold">
            Log in
          </button>
        </form>
        <p className="text-center text-xs text-stone-500 mt-4">
          <a href="/" className="underline">← Back to the live site</a>
        </p>
      </div>
    </div>
  );
}
