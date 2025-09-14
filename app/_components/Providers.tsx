'use client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// 将来ここに SnackbarProvider / LocalizationProvider / QueryClientProvider などを追加

const theme = createTheme({ palette: { mode: 'light' } });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
