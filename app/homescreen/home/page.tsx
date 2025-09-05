// app/events/[eventId]/page.tsx（フル版：簡易詳細）
// URLの /events/◯◯ の "◯◯" 部分が params.eventId に入ります。
import Link from "next/link";
import { mockEvents } from "@/lib/mock";

export default async function EventDetail({ params }: { params: { eventId: string } }) {
  // 動的パラメータで該当のイベントを検索
  const event = mockEvents.find((e) => e.id === params.eventId);

  if (!event) {
    // 見つからないときのガード。初回はメッセージでOK、not-found.tsxに分離も可能。
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p>イベントが見つかりませんでした。</p>
        <Link href="/events" className="underline">一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/events" className="underline text-sm">&larr; 一覧へ</Link>
      <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
      <p className="opacity-70">{event.venue ?? "-"}</p>
      <p className="mt-2">{event.description ?? "説明は準備中です。"}</p>
      {/* 後半で予約枠（/events/[eventId]/slots）をSupabaseに接続して表示します */}
    </main>
  );
}
