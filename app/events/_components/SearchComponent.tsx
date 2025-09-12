"use client";

import React, { useState } from "react";

interface Props {
  selectedAreas: string[];
}

interface EventItem {
  name: string;
  area: string;
}

const availableTags = ["音楽", "花火", "フード", "スポーツ", "ワークショップ", "祭り"];

const SearchTags: React.FC<Props> = ({ selectedAreas }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const areaQuery = selectedAreas.join(",");
      const tagQuery = selectedTags.join(",");
      const response = await fetch(`/api/search?q=${tagQuery}&areas=${areaQuery}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: EventItem[] = await response.json();
      setResults(data);
    } catch (err) {
      console.error("検索エラー:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* タグ選択 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
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
        disabled={selectedTags.length === 0 && selectedAreas.length === 0}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: selectedTags.length === 0 && selectedAreas.length === 0 ? "not-allowed" : "pointer",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        検索
      </button>

      {/* ローディング */}
      {loading && <p style={{ color: "#666", fontSize: "0.9rem" }}>検索中...</p>}

      {/* 検索結果 */}
      <ul>
        {results.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "0.5rem 0",
              borderBottom: "1px solid #eee",
              fontSize: "0.95rem",
              color: "#333",
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTags;
