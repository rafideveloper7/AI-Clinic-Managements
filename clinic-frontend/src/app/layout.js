import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "AI Clinic Management",
  description: "Clinic operations dashboard for admin, doctors, receptionists, and patients.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
