import { Onest } from "next/font/google";
import "@/app/globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata = {
  title: "Baseline — Tennis Club & Academy",
  description:
    "A members' tennis club and academy where focused coaching meets championship courts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={onest.variable}>
      <body>{children}</body>
    </html>
  );
}