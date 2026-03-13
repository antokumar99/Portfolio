import "./globals.css";
import { Providers } from "@/components/ui/Providers";

export const metadata = {
  title: {
    default: "Anto Kumar — Full-Stack Developer",
    template: "%s | Anto Kumar",
  },
  description: "Full-Stack Developer & Creative Technologist building fast, beautiful, and intelligent web products.",
  keywords: ["developer", "portfolio", "next.js", "full-stack", "javascript"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{<Providers>{children}</Providers>}</body>
    </html>
  );
}
