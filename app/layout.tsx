// app/layout.tsx
// RootLayoutはServer Component。MUIのApp Router用Cache Providerを利用。
import type { Metadata } from 'next';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; ← 削除
import './globals.css';

export const metadata: Metadata = { title: 'Mini-Reserve', description: 'Events demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* MUIのProviderは不要。必要ならThemeProvider等を使ってください */}
        {children}
      </body>
    </html>
  );
}

