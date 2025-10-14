import "./globals.css";
import Clarity from './Clarity';
import GoogleAnalytics from './GoogleAnalytics';
import LayoutWrapper from "./LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Personalized Song Maker | Turn Your Story Into a Song</title>
        <meta name="description" content="Create a unique, personalized song from your stories. The perfect gift for any occasion. Fast, affordable, and heartfelt." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.personalizedsongmaker.com/" />
        <meta property="og:title" content="Personalized Song Maker | Turn Your Story Into a Song" />
        <meta property="og:description" content="Create a unique, personalized song from your stories. The perfect gift for any occasion. Fast, affordable, and heartfelt." />
        <meta property="og:image" content="https://www.personalizedsongmaker.com/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.personalizedsongmaker.com/" />
        <meta property="twitter:title" content="Personalized Song Maker | Turn Your Story Into a Song" />
        <meta property="twitter:description" content="Create a unique, personalized song from your stories. The perfect gift for any occasion. Fast, affordable, and heartfelt." />
        <meta property="twitter:image" content="https://www.personalizedsongmaker.com/og-image.png" />

        <GoogleAnalytics />
        <Clarity />
      </head>
      <body className="antialiased bg-white text-slate-700">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
