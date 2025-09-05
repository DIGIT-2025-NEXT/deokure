"use client";

import * as React from 'react';
import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
            北九log
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start mt-[-80px]">
        <p className="text-4xl font-bold">
            北九logの使用方法
        </p>
        <p className='text-2×1'></p>
        <p className="text-3xl font-bold">
            投稿方法
        </p>

            <p>
                1. ホーム画面の、+ボタンを押すことで、投稿画面が表示されます。
            </p>
            <p>
                image
            </p>
            <p>
                2. 下にあるように、画像、タグ、コメント、URL(任意)を入力し、投稿ボタンを押すことで投稿できます。
            </p>
            <p>
                image
            </p>
        <p className="text-3xl font-bold">
            閲覧方法
        </p>
            <p>
                1. ホーム画面の🔍ボタンを押すことで、検索画面が表示されます。
            </p>
            <p>
                image
            </p>
            <p>
                2. 検索画面では、タグ、場所(何区か)を選択することで、検索が出来ます。
            </p>
            <p>
                image
            </p>
            <p>
                3. 検索結果やホーム画面で、投稿をクリック(タッチ)することで閲覧できます。
            </p>
            <p>
                image
            </p>
          <p className="text-3xl font-bold">
            よくある質問
          </p>
          <p>
            Q.検索をする際に文字を入力することで検索できますか？
          </p>
          <p>
             A.出来ません。タグと場所を選択することで検索できます。
          </p>
          <p>
            Q.
          </p>
          <p>
            A.
          </p>
        </main>
      </div>
    </ThemeProvider>
  );
}
