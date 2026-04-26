"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setLoading, setUser]);

  return <>{children}</>;
}
