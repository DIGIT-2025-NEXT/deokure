/*eslint-disable*/
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// タグ項目
const TAGS_TYPE1 = [
  "カフェ", "レストラン", "居酒屋", "bar",
  "城", "博物館", "美術館", "公園", "お祭り","その他"
];
const TAGS_TYPE2 = [
  "八幡西区", "八幡東区", "小倉北区", "小倉南区",
  "若松区", "門司区", "戸畑区"
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedStoreName, setSelectedStoreName] = useState<string>("");
  const [selectedPlaceName, setSelectedPlaceName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // ユーザー情報を取得
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  // 画像をSupabase Storageにアップロード
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`; // post-images/は不要（バケット名で指定済み）

      const { error: uploadError } = await supabase.storage
        .from('post-images') // バケット名
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      // 公開URLを取得（正しい形式）
      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);
      
      console.log('Image uploaded successfully. URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !content) {
      alert("タイトルと内容は必須です。");
      setIsLoading(false);
      return;
    }
    if (!selectedStoreName || !selectedPlaceName) {
      alert("タグを両方選んでください。");
      setIsLoading(false);
      return;
    }

    let imageUrl: string | null = null;

    // 画像がある場合はアップロード
    if (image) {
      console.log('画像が選択されています:', image.name);
      imageUrl = await uploadImage(image);
      if (!imageUrl) {
        alert("画像のアップロードに失敗しました。");
        setIsLoading(false);
        return;
      }
    }

    // Supabaseに保存
    const { data, error } = await supabase.from("post").insert([
      {
        title,
        content,
        image_url: imageUrl, // 画像URLを保存
        user_id: "00000000-0000-0000-0000-000000000000", // デモ用ダミーID
        tag_store_name: selectedStoreName,
        tag_place_name: selectedPlaceName,
      },
    ]);

    if (error) {
      console.error("Insert Error:", error.message);
      alert("保存に失敗しました: " + error.message);
      setIsLoading(false);
      return;
    }

    console.log("Insert Success:", data);
    alert("保存できました！");

    // フォームをリセット
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedStoreName("");
    setSelectedPlaceName("");

    // 保存できたらトップへ
    router.push("/");
    setIsLoading(false);
  };

  return (
    <main className="relative max-w-2xl mx-auto">
      {/* ヘッダー */}
      <header className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold">北九log</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            画像
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image && (
            <p className="text-sm text-gray-500">選択されたファイル: {image.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            場所
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            コメント
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            店舗選択
          </label>
          <select
            id="tag_store"
            name="tag_store"
            value={selectedStoreName}
            onChange={(e) => setSelectedStoreName(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">選択してください</option>
            {TAGS_TYPE1.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            場所選択
          </label>
          <select
            id="tag_place"
            name="tag_place"
            value={selectedPlaceName}
            onChange={(e) => setSelectedPlaceName(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">選択してください</option>
            {TAGS_TYPE2.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "投稿中..." : "投稿"}
        </button>
      </form>
    </main>
  );
};

export default PostForm;