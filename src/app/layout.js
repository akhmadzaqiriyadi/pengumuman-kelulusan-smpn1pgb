import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Pengumuman Kelulusan - SMPN 1 Pagerbarang",
  description: "Pengumuman kelulusan siswa kelas 9 SMPN 1 Pagerbarang tahun ajaran 2025/2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jakartaSans.variable} font-sans`} suppressHydrationWarning>
      <body className={`${jakartaSans.className} bg-slate-50 text-slate-800 antialiased min-h-screen`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
