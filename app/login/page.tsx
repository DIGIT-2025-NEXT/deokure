'use client';

import React from 'react';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { HelpCircle } from "lucide-react";



const App = () => {
  // Googleログインボタンがクリックされたときに呼び出される関数
  const handleGoogleLogin = () => {
    // Google認証を実行（next-authの signIn を使用）
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="w-full flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold">北九log</h1>
        <Link
          href="/ifu"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4">
        <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all hover:scale-105">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              ログイン
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              続行するにはログインしてください。
            </p>
          </div>

          {/* Google ログインボタン */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGoogleLogin}
          >
            Googleでログイン
          </Button>
        </div>
      </div>
    </>
  );
};

export default App;