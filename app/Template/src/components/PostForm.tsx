<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
=======

"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"
>>>>>>> 256a33b28d54e2147fcfa715711f00c5d8aae5bc

// タグ項目
const TAGS_TYPE1 = [
  "カフェ", "レストラン", "居酒屋", "bar",
  "あ", "い", "う」", "え"
];
const TAGS_TYPE2 = [
  "八幡西区", "八幡東区", "小倉北区", "小倉南区",
  "若松区", "門司区", "戸畑区"
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [storeTags, setStoreTags] = useState<{ id: string; name: string }[]>([]);
  const [placeTags, setPlaceTags] = useState<{ id: string; name: string }[]>([]);

  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");

  // タグを取得
  useEffect(() => {
    const fetchTags = async () => {
      const { data: storeData } = await supabase.from("tag_store").select("id, name");
      const { data: placeData } = await supabase.from("tag_place").select("id, name");
      setStoreTags(storeData || []);
      setPlaceTags(placeData || []);
    };
    fetchTags();
  }, []);

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("タイトルと内容は必須です。");
      return;
    }
    if (!selectedStoreId || !selectedPlaceId) {
      alert("タグを両方選んでください。");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div>
        <label>
          画像
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          タイトル
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          内容
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          店舗タグ
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            {TAGS_TYPE1.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          場所タグ
          <select
            value={selectedPlaceId}
            onChange={(e) => setSelectedPlaceId(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            {TAGS_TYPE2.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">投稿</button>
    </form>
  );
};

export default PostForm;