import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Cinematic portfolio with admin-controlled content",
  openGraph: {
    title: "Portfolio",
    description: "Cinematic portfolio with admin-controlled content",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full text-[var(--color-foreground)]">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
