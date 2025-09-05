// app/page.tsx
import Link from "next/link";
import { Search, Plus } from "lucide-react";

// 仮データ（後でSupabaseに置き換え可）
const mockPosts = [
  { id: "3", content: "戸畑祇園大山笠、迫力がすごい！", created_at: "2025-09-05T10:00:00" },
  { id: "2", content: "小倉城のライトアップを見に行ったよ✨", created_at: "2025-09-04T20:00:00" },
  { id: "1", content: "門司港レトロに遊びに行ってきました！", created_at: "2025-09-03T15:00:00" },
];

export default function HomePage() {
  // 新着順に並べ替え
  const posts = [...mockPosts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <main className="relative max-w-2xl mx-auto">
      {/* ヘッダー */}
      <header className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold">北九log</h1>
        <button className="p-2 rounded-full hover:bg-blue-500">
          <Search className="w-5 h-5" />
        </button>
      </header>

      {/* 投稿一覧 */}
      <div className="p-4 space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-4 border rounded-xl shadow-sm bg-white"
          >
            <p>{post.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(post.created_at).toLocaleString("ja-JP")}
            </p>
          </article>
        ))}
      </div>

      {/* 投稿ボタン（右下に固定） */}
      <Link
        href="/post/new"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </main>
  );
}
