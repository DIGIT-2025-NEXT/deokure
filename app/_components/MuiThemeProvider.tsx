/*eslint-disable*/
'use client'; 
// ↑ ファイル全体をクライアントコンポーネントとして扱う

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import city7 from '../events/data/city7';

// お好みでカスタム（色やフォント）。まずはデフォルトに近いライトテーマ
const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#1976d2' } },
});

// MuiThemeProvider を普通の関数として定義（export はしない）
function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// ページコンポーネント
export default function Page() {
  function renderInput(params: any) {
    return <input {...params} />;
  }

  return (
    // <MuiThemeProvider>
    //   <Autocomplete 
    //     renderInput={renderInput} 
    //     options={city7}  
    //     sx={{ width: 300 }} 
    //     disablePortal />
    // </MuiThemeProvider>
    <p>test</p>
  );
}
