// app/layout.tsx
// RootLayout は既定で Server Component。MUIのApp Router用Cache Providerを包むだけ。
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';

export const metadata: Metadata = { title: 'Mini-Reserve', description: 'Events demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* MUIがサーバー側で生成したスタイルを正しく<head>へ差し込む */}
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
        <p>aaa</p>
      </body>
    </html>
  );
}

