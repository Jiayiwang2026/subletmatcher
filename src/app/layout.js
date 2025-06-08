import './globals.css';

export const metadata = {
  title: 'SubletMatcher - Smart Sublease Matching Platform',
  description: 'Find your perfect sublease with our AI-powered matching platform. Studio, 1B1B, 2B2B, and more available.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* 直接使用系统字体 */}
        {children}
      </body>
    </html>
  );
}