"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, hasSupabase } from "@/lib/supabase";

export default function AdminGate({ children }) {
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) { setSession(null); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!hasSupabase) return <p className="mx-auto max-w-lg p-10 text-center text-mute">Admin needs Supabase. Add your URL and anon key to <code>.env.local</code>, then restart the server.</p>;
  if (session === undefined) return <p className="p-10 text-center text-mute">Loading…</p>;

  if (!session) {
    async function login(e) {
      e.preventDefault(); setBusy(true); setErr("");
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setErr("Wrong email or password."); 
      setBusy(false);
    }
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <form onSubmit={login} className="grid w-full max-w-sm gap-4 rounded-3xl border border-line bg-white p-7 shadow-sm">
          <h1 className="font-serif text-3xl font-extrabold text-navy">Admin login</h1>
          <label className="grid gap-1.5 font-semibold">Email<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
          <label className="grid gap-1.5 font-semibold">Password<input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" required /></label>
          {err && <p role="alert" className="text-sm font-medium text-red-700">{err}</p>}
          <button className="btn btn-wa" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
          <Link href="/" className="text-center text-sm font-semibold text-mute">Back to website</Link>
        </form>
      </main>
    );
  }
  return (
    <>
      <div className="border-b border-line bg-white"><div className="wrap flex items-center justify-between py-3">
        <Link href="/admin" className="font-serif text-lg font-extrabold text-navy">Kshiraj Admin</Link>
        <div className="flex items-center gap-4 text-sm font-semibold"><Link href="/" className="text-leaf">View website</Link><button onClick={() => supabase.auth.signOut()} className="text-mute">Sign out</button></div>
      </div></div>
      {children}
    </>
  );
}
