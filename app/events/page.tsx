
/*eslint-disable*/
"use client"; 

import React, { useState, useEffect } from 'react';
import MultiSelectChips from './_components/MultiSelectChips';

interface Post {
  id: string;
  image_url?: string;
  tag_place_name: string;
  content: string;
  created_at?: string | Date;
}

const availableTags = ["音楽", "花火", "フード", "スポーツ", "ワークショップ", "祭り","カフェ","城"];

const EventsPage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 全投稿を取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        const data: Post[] = await response.json();
        setAllPosts(data);
        setFilteredPosts(data); // 初期状態では全ての投稿を表示
      } catch (error) {
        console.error('投稿取得エラー:', error);
      }
    };
    fetchPosts();
  }, []);

  // タグの選択/解除
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 検索実行
  const handleSearch = async () => {
    setLoading(true);
    try {
      let filtered = [...allPosts];

      // エリアでフィルタリング（選択されている場合）
      if (selectedAreas.length > 0) {
        filtered = filtered.filter(post => 
          selectedAreas.includes(post.tag_place_name)
        );
      }

      // タグでフィルタリング（選択されている場合）
      // 現在のデータではtag_place_nameに地域名が入っているため、
      // タグ検索は内容（content）で行う
      if (selectedTags.length > 0) {
        filtered = filtered.filter(post =>
          selectedTags.some(tag => post.content.includes(tag))
        );
      }

      setFilteredPosts(filtered);
    } catch (error) {
      console.error('検索エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // 条件がリセットされた時に全件表示に戻す
  useEffect(() => {
    if (selectedAreas.length === 0 && selectedTags.length === 0) {
      setFilteredPosts(allPosts);
    }
  }, [selectedAreas, selectedTags, allPosts]);

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
          maxWidth: '800px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* 地域選択 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#1976d2', borderRadius: '2px', marginRight: '12px' }} />
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.3rem', fontWeight: 600 }}>地域選択</h2>
          </div>

          <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
            イベントを検索したい区を選択してください。複数選択が可能です。
          </p>

          <MultiSelectChips selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} />

          {/* タグ選択 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', marginTop: '2rem' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#1976d2', borderRadius: '2px', marginRight: '12px' }} />
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.3rem', fontWeight: 600 }}>カテゴリー選択</h2>
          </div>

          <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
            興味のあるイベントカテゴリーを選択してください。
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: "0.3rem 0.7rem",
                  borderRadius: "16px",
                  border: selectedTags.includes(tag) ? "1px solid #1976d2" : "1px solid #ccc",
                  backgroundColor: selectedTags.includes(tag) ? "#1976d2" : "#f0f0f0",
                  color: selectedTags.includes(tag) ? "#fff" : "#333",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 検索ボタン */}
          <button
            onClick={handleSearch}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            {loading ? "検索中..." : "検索"}
          </button>

          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
              💡 <strong>ヒント:</strong> 複数の区やカテゴリーを選択すると、より具体的な検索ができます。
            </p>
          </div>

          {/* 検索結果 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#1976d2', borderRadius: '2px', marginRight: '12px' }} />
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.3rem', fontWeight: 600 }}>
              イベント一覧 ({filteredPosts.length}件)
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <p>検索中...</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1rem' 
            }}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    style={{
                      padding: '1.5rem',
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt="投稿画像" 
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '1rem'
                        }}
                      />
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {post.tag_place_name && (
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          border: '1px solid #1976d2',
                          borderRadius: '12px',
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2'
                        }}>
                          {post.tag_place_name}
                        </span>
                      )}
                    </div>
                    <p style={{ 
                      margin: '0 0 1rem 0', 
                      lineHeight: '1.5', 
                      color: '#333',
                      fontSize: '0.95rem'
                    }}>
                      {post.content}
                    </p>
                    {post.created_at && (
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.8rem', 
                        color: '#999',
                        textAlign: 'right'
                      }}>
                        {new Date(post.created_at).toLocaleString("ja-JP")}
                      </p>
                    )}
                  </article>
                ))
              ) : (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: '#666'
                }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>😔 該当するイベントが見つかりませんでした</p>
                  <p style={{ fontSize: '0.9rem' }}>別の条件で検索してみてください。</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;