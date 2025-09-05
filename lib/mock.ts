// lib/mock.ts（フル版）
// --- 型定義 ---------------------------------------------------------------
// EventItem は最低限の表示に必要な項目だけを持つ。
// starts_on は「日付のみ」を扱うので ISO 文字列 "YYYY-MM-DD" とする。
// （タイムゾーンのズレを避けるため、ここでは時刻は持たせない）
export type EventItem = {
  id: string;
  title: string;
  description?: string;
  venue?: string;
  starts_on: string;
};

// 今日の日付（ローカル）を 00:00 に正規化して比較したい。
// toDateString() → new Date() で "その日の 00:00" っぽい基準を作る小技。
const today = new Date();

export const mockEvents: EventItem[] = [
  { id: "e1",  title: "はじめてのAI体験",    venue: "Nago Hub",        starts_on: "2025-08-24" },
  { id: "e2",  title: "Next.js入門",         venue: "Online",          starts_on: "2025-09-01" },
  { id: "e3",  title: "親子プログラミング",   venue: "Community Hall",  starts_on: "2025-08-22" },
  { id: "e4",  title: "Flutterハンズオン",    venue: "Fukuoka Tech",    starts_on: "2025-09-15" },
  { id: "e5",  title: "AIと教育セミナー",     venue: "Okinawa Univ.",   starts_on: "2025-10-01" },
  { id: "e6",  title: "Webセキュリティ基礎",  venue: "Tokyo Online",    starts_on: "2025-08-28" },
  { id: "e7",  title: "学生ハッカソン",       venue: "Nagoya Tech",     starts_on: "2025-09-10" },
  { id: "e8",  title: "データサイエンス入門",  venue: "Kyoto Lab",       starts_on: "2025-09-05" },
  { id: "e9",  title: "クラウド勉強会",       venue: "AWS Japan",       starts_on: "2025-08-30" },
  { id: "e10", title: "React初心者講座",       venue: "Zoom",            starts_on: "2025-08-26" },
  { id: "e11", title: "DX推進セミナー",        venue: "Osaka City",      starts_on: "2025-08-20" }, // 過去（フィルタで除外）
  { id: "e12", title: "AIスタートアップ座談会", venue: "Tokyo",           starts_on: "2025-09-20" },
];

export function getNext10(events = mockEvents) {
  // 1) 今日以降のイベントだけに絞る
  // 2) 開催日が近い順（昇順）に並べ替える
  // 3) 最大10件だけ取り出す
  return events
    .filter((e) => new Date(e.starts_on) >= new Date(today.toDateString())) // 過去除外
    .sort((a, b) => +new Date(a.starts_on) - +new Date(b.starts_on))       // 近い順
    .slice(0, 10);                                                          // 10件
}
