import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";

// Baloo Bhaijaan 2 is a rounded, playful font that supports BOTH Latin and Arabic,
// so the whole UI stays consistent when the user switches languages.
const playful = Baloo_Bhaijaan_2({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playful",
});

export const metadata = {
  title: "Story Sky | سماء الحكايات",
  description:
    "A magical story generator for kids aged 6 to 15 — in Arabic and English!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playful.variable} font-playful antialiased`}>
        {children}
      </body>
    </html>
  );
}
