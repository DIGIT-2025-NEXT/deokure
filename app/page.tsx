// app/page.tsx
import Link from "next/link";
import { Search, Plus } from "lucide-react";


//投稿データの仮置き。実際はここを SupabaseなどDB に置き換えて使う予定。
const mockPosts = [
  { id: "3", content: "戸畑祇園大山笠、迫力がすごい！", created_at: "2025-09-05T10:00:00" },
  { id: "2", content: "小倉城のライトアップを見に行ったよ✨", created_at: "2025-09-04T20:00:00" },
  { id: "1", content: "門司港レトロに遊びに行ってきました！", created_at: "2025-09-03T15:00:00" },
];

export default function HomePage() {

  //投稿を「新しい順」に並べ替え
  //sort 関数で created_at を比較して、日付の新しいものを先頭に持ってきている
  const posts = [...mockPosts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <main className="relative w-full min-h-screen bg-gray-50">
  {/* ヘッダー */}
  <header className="w-full flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow">
    <h1 className="text-lg font-bold">北九log</h1>
  </header>

  {/* 投稿一覧 */}
  <div className="w-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {posts.map((post) => (
      <article
        key={post.id}
        className="p-4 border rounded-xl shadow-sm bg-white flex flex-col"
      >
        <p>{post.content}</p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(post.created_at).toLocaleString("ja-JP")}
        </p>
      </article>
    ))}
  </div>

  {/* 右下の固定ボタン群（縦方向） */}
  <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
    {/* 検索ボタン（上） */}
    <button className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-400">
      <Search className="w-8 h-8" />
    </button>

    {/* +ボタン（下） */}
    <Link
      href="/post/new"
      className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
    >
      <Plus className="w-6 h-6" />
    </Link>
  </div>

</main>

  );
}
