import React, { useState } from 'react';
import { Calendar, User, Eye, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  category: string;
  views: number;
  comments: number;
  summary: string;
}

const SearchResultsTable = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // サンプルデータ
  const [results] = useState<SearchResult[]>([
    {
      id: 1,
      title: "React Hooksの基本的な使い方",
      author: "田中太郎",
      publishDate: "2024-03-15T10:30:00Z",
      category: "技術",
      views: 1250,
      comments: 23,
      summary: "React Hooksの基本的な使い方について詳しく解説します。useStateやuseEffectの実践的な活用方法を紹介。"
    },
    {
      id: 2,
      title: "TypeScriptでのエラーハンドリング",
      author: "佐藤花子",
      publishDate: "2024-03-14T14:45:00Z",
      category: "技術",
      views: 890,
      comments: 15,
      summary: "TypeScriptにおけるエラーハンドリングのベストプラクティスとパターンを解説します。"
    },
    {
      id: 3,
      title: "モダンCSSのレイアウト手法",
      author: "鈴木一郎",
      publishDate: "2024-03-13T09:15:00Z",
      category: "デザイン",
      views: 2100,
      comments: 42,
      summary: "Grid、Flexbox、Container Queriesなど、モダンなCSSレイアウト手法を実例とともに紹介。"
    },
    {
      id: 4,
      title: "Node.jsでのAPI設計パターン",
      author: "高橋明",
      publishDate: "2024-03-12T16:20:00Z",
      category: "バックエンド",
      views: 1680,
      comments: 31,
      summary: "RESTful APIの設計原則と実装パターンをNode.jsとExpressを使って解説します。"
    },
    {
      id: 5,
      title: "UXデザインの基本原則",
      author: "山田美咲",
      publishDate: "2024-03-11T11:00:00Z",
      category: "デザイン",
      views: 950,
      comments: 18,
      summary: "ユーザーエクスペリエンスデザインの基本原則と実践的な適用方法について説明します。"
    },
    {
      id: 6,
      title: "データベース最適化のコツ",
      author: "伊藤健太",
      publishDate: "2024-03-10T13:30:00Z",
      category: "データベース",
      views: 1420,
      comments: 27,
      summary: "SQLクエリの最適化とインデックスの効果的な使用方法について詳しく解説。"
    }
  ]);

  // 投稿日時でソート
  const sortedResults = [...results]
    .filter(result => 
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '技術': 'bg-blue-100 text-blue-800',
      'デザイン': 'bg-purple-100 text-purple-800',
      'バックエンド': 'bg-green-100 text-green-800',
      'データベース': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">検索結果一覧</h1>
        
        {/* 検索フィルター */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="タイトル、著者、カテゴリで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">投稿順:</span>
            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'desc' ? '新しい順' : '古い順'}
              {sortOrder === 'desc' ? 
                <ChevronDown className="w-4 h-4" /> : 
                <ChevronUp className="w-4 h-4" />
              }
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {sortedResults.length}件の結果が見つかりました
        </div>
      </div>

      {/* 検索結果テーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  記事情報
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  著者・投稿日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  統計
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.summary}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {result.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(result.publishDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {result.views.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {result.comments}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索条件に一致する結果が見つかりませんでした。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsTable;