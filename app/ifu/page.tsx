"use client";

import * as React from 'react';
import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import Link from "next/link";
import { Search, Plus , HelpCircle} from "lucide-react";
import Image from 'next/image';

export default function Home() {
  return (
      <>
       {/* ヘッダー */}
       <header className="w-full flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow">
        <a href="http://localhost:3000/">
        <h1 className="text-lg font-bold">北九log</h1>
        </a>
        <Link
        href="/ifu"
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
        <HelpCircle className="w-5 h-5" />
        </Link>
        </header>


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
            <img
            src="/ifu_2.png"
            alt="投稿画面"
            width={400}
            height={200}
            style={{ width: '40%', height: 'auto' }}
            />
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
            <img
            src="/ifu_4.png"
            alt="検索画面"
            width={400}
            height={200}
            style={{ width: '40%', height: 'auto' }}
            />
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
      </>
  );
}
