"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in");
      router.replace("/admin/dashboard/hero");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl overflow-hidden rounded-xl border bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between border-b bg-slate-900 p-8 text-white lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">Admin</p>
            <h1 className="mt-4 max-w-sm text-4xl font-semibold tracking-tight">Content operations for your portfolio.</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Sign in to update hero content, projects, experience, contact information, and incoming messages.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/6 p-4">
              Clean content editing
            </div>
            <div className="rounded-lg border border-white/10 bg-white/6 p-4">
              Fast access to portfolio sections
            </div>
          </div>
        </div>
        <div className="flex items-center p-8">
          <Card className="w-full border-0 bg-transparent p-0 shadow-none">
            <h2 className="mb-1 text-2xl font-semibold text-slate-900">Sign in</h2>
            <p className="mb-6 text-sm text-slate-500">Use the admin email and password configured for Firebase Authentication.</p>
            <form onSubmit={submit} className="space-y-3">
              <Input placeholder="Admin email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button className="mt-2 w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
