// app/events/page.tsx（フル版：並び替え・整形つき）
// このページはServer Component。DB無しのモックから"近い順10件"を取得して表示します。
import { getNext10 } from "@/lib/mock";

export default async function EventsPage() {
  // getNext10 は "今日以降" をフィルタして"近い順"に並べた配列を返すヘルパー
  const events = getNext10();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">直近のイベント（10件）</h1>

      {/* 空配列のときの分岐。ユーザーに状態を伝えるのがUX的に大切 */}
      {events.length === 0 ? (
        <p className="text-sm opacity-70">直近のイベントは見つかりませんでした。</p>
      ) : (
        <ul className="space-y-4">
          {events.map((e) => (
            <li key={e.id} className="border rounded-xl p-4">
              {/* 日付表示は一旦簡易関数。後でIntlに置き換えるとロケールに強い */}
              <div className="text-sm opacity-70">{formatDate(e.starts_on)}</div>
              <h2 className="text-lg font-semibold">{e.title}</h2>
              <div className="text-sm">{e.venue ?? "-"}</div>
              <a href={`/events/${e.id}`} className="inline-block mt-2 text-sm underline">
                詳細を見る
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// 簡易フォーマッタ。演習ではまず素朴に実装し、次回Intlへ差し替えます。
function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
