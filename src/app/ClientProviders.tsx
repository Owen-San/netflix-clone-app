"use client";

import type { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../../hooks/useAuth";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <AuthProvider>{children}</AuthProvider>
    </RecoilRoot>
  );
}
