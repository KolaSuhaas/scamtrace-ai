import "./globals.css";

export const metadata = {
  title: "ScamTrace AI",
  description: "AI-powered scam investigation engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
