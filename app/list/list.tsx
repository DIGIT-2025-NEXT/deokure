"use client";

import { useState, useMemo } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO形式 "2025-09-12T12:00:00Z"
};

const samplePosts: Post[] = [
  {
    id: 1,
    title: "初めての投稿",
    content: "これは最初の投稿です。",
    createdAt: "2025-09-10T10:00:00Z",
  },
  {
    id: 2,
    title: "検索機能を追加",
    content: "検索フォームから投稿を探せます。",
    createdAt: "2025-09-11T15:00:00Z",
  },
  {
    id: 3,
    title: "最新の投稿",
    content: "これは最新の投稿です。",
    createdAt: "2025-09-12T09:30:00Z",
  },
];

export default function SearchablePostList() {
  const [query, setQuery] = useState("");

  // 検索 + 投稿日時でソート
  const filteredPosts = useMemo(() => {
    return samplePosts
      .filter(
        (post) =>
          post.title.includes(query) || post.content.includes(query)
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ); // 新しい順
  }, [query]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">投稿一覧</h1>

      {/* 検索フォーム */}
      <input
        type="text"
        placeholder="キーワードで検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* 一覧表 */}
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr>
            <th className="border p-2">タイトル</th>
            <th className="border p-2">内容</th>
            <th className="border p-2">投稿日</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.content}</td>
              <td className="border p-2">
                {new Date(post.createdAt).toLocaleString("ja-JP")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPosts.length === 0 && (
        <p className="mt-4 text-gray-500">検索結果がありません。</p>
      )}
    </div>
  );
}
