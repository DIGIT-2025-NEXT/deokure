// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, HelpCircle } from "lucide-react";
import { supabase } from "./Template/src/lib/supabaseClient"; // ← Supabaseクライアントをimport

export default async function HomePage() {
  // 🔹 Supabaseから投稿データを取得
  const { data: posts, error } = await supabase
    .from("post") // ← Supabaseのテーブル名（例: posts）
    .select("id, image_url, tag_place_name, tag_store_name, title, content")

  if (error) {
    console.error("Supabase Error:", error.message);
    return <p className="p-4 text-red-500">データ取得に失敗しました</p>;
  }

  return (
    <main className="relative w-full min-h-screen bg-gray-50">
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

      {/* 投稿一覧 */}
      <div className="w-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {posts?.map((post) => (
          <article
            key={post.id}
            className="p-4 border rounded-xl shadow-sm bg-white flex flex-col"
          >
            {/* 画像がある場合のみ表示 */}
            <div className="relative w-full aspect-[4/3] mb-2">
              <Image
                 src={post.image_url}
                 alt="投稿画像"
                 fill
                 className="object-cover rounded-lg"
              />
            </div>


            {/* タグ */}
            <p>
              <span className="px-2 py-1 text-xs font-medium border border-gray-300 rounded-full bg-gray-100 text-gray-700">
                {post.tag_place_name},{post.tag_store_name}
              </span>
            </p>

            {/* コンテンツ */}
            <p>{post.content}</p>

            {/* 投稿日時 */}
            <p className="text-xs text-gray-500 mt-2">
              {post.title}
            </p>
          </article>
        ))}
      </div>

      {/* 右下の固定ボタン群 */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        {/* 検索ボタン */}
        <Link
          href="/events"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <Search className="w-6 h-6" />
        </Link>

        {/* +ボタン */}
        <Link
          href="/Template"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </div>
    </main>
  );
}
