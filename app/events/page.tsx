"use client"; 

import React, { useState, useEffect } from 'react';
import MultiSelectChips from './_components/MultiSelectChips';
import SearchComponent from './_components/SearchComponent';

interface Post {
  id: number;
  image?: string;
  tag: string;
  content: string;
  created_at: string | Date;
}

const EventsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('投稿取得エラー:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <header style={{
        width: '100%',
        padding: '1.5rem 0',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: 600, letterSpacing: '0.5px' }}>北九log</h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 400 }}>
          お住まいの区を選択してイベントを探しましょう
        </p>
      </header>

      <main style={{ padding: '3rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#1976d2', borderRadius: '2px', marginRight: '12px' }} />
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.3rem', fontWeight: 600 }}>地域選択</h2>
          </div>

          <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
            イベントを検索したい区を選択してください。複数選択が可能です。
          </p>

          <MultiSelectChips selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} />

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
              💡 <strong>ヒント:</strong> 複数の区を選択すると、より多くのイベントが見つかります。
            </p>
          </div>

          <SearchComponent selectedAreas={selectedAreas} />

          <div className="w-full p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post) => (
              <article key={post.id} className="p-4 border rounded-xl shadow-sm bg-white flex flex-col">
                {post.image && <img src={post.image} alt="投稿画像" className="rounded-lg mb-2" />}
                <span className="px-2 py-1 text-xs font-medium border border-gray-300 rounded-full bg-gray-100 text-gray-700">{post.tag}</span>
                <p>{post.content}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(post.created_at).toLocaleString("ja-JP")}</p>
              </article>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default EventsPage;
