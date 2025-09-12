'use client';

import React from 'react';
import { CitySelector, TagList, ChipComponent } from './_components';
import { useEventFilters } from './hooks/useEventFilters';

export default function EventSearchPage() {
  // フィルター状態を管理
  const {
    selectedCity,
    selectedTags,
    setSelectedCity,
    clearFilters,
    addTag,
    removeTag,
  } = useEventFilters();

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ 
        width: '100%', 
        padding: '1rem 0', 
        background: '#1976d2', 
        textAlign: 'center', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)' 
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>
          北九log
        </h1>
      </header>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* 都市選択 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>地域を選択</h2>
          <CitySelector
            value={selectedCity}
            onChange={setSelectedCity}
            fullWidth={false}
          />
        </section>

        {/* タグ選択 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>タグ</h2>
          <TagList onTagClick={(tagId) => {
            console.log('Tag clicked:', tagId);
            // 必要に応じてaddTagを呼び出し
          }} />
        </section>

        {/* チップコンポーネント */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>アクション</h2>
          <ChipComponent
            onChipClick={(chipId) => console.log('Chip clicked:', chipId)}
            onChipDelete={(chipId) => console.log('Chip deleted:', chipId)}
          />
        </section>

        {/* フィルター状態の表示 */}
        <section>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>選択状態</h2>
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <p><strong>選択した区:</strong> {selectedCity?.label || '未選択'}</p>
            <p><strong>選択したタグ数:</strong> {selectedTags.length}</p>
            {selectedTags.length > 0 && (
              <button 
                onClick={clearFilters}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                フィルターをクリア
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}