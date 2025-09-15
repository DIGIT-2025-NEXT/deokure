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
  "八幡西", "八幡東", "小倉北", "小倉南",
  "若松", "門司", "戸畑"
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

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

  // 画像選択時の処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // 画像削除
  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !content) {
      alert("場所の名前とコメントは必須です。");
      setIsLoading(false);
      return;
    }
    if (!selectedStoreName || !selectedPlaceName) {
      alert("タグを両方選んでください。");
      setIsLoading(false);
      return;
    }

    let imageUrl: string | null = null;

    if (image) {
      console.log('画像が選択されています:', image.name);
      imageUrl = await uploadImage(image);
      if (!imageUrl) {
        alert("画像のアップロードに失敗しました。");
        setIsLoading(false);
        return;
      }
    }

    const { data, error } = await supabase.from("post").insert([
      {
        title,
        content,
        image_url: imageUrl,
        user_id: "00000000-0000-0000-0000-000000000000",
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

    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setSelectedStoreName("");
    setSelectedPlaceName("");

    router.push("/");
    setIsLoading(false);
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* ヘッダー */}
      <div className="bg-blue-400 text-black px-4 py-3 text-center">
        <h1 className="text-lg font-bold">北九log</h1>
      </div>

      <div className="max-w-sm mx-auto p-4 space-y-4">
        {/* 画像選択エリア */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          {!imagePreview && (
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-gray-600">ファイルを選択</span>
              </label>
            </div>
          )}
          
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="プレビュー"
                className="w-full h-64 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 場所の名前 */}
        <div className="flex space-x-2">
          <div className="px-3 py-2 text-sm font-medium flex items-center">
            場所
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 px-3 py-2 border bg-white border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="場所名を入力(例：小倉城）"
          />
        </div>

        {/* タグ選択 */}
        <div className="space-y-3">
          {/* 店舗タグ */}
          <div className="px-3 py-2 text-sm font-medium flex items-center">
          カテゴリー選択
          </div>
          <div className="flex flex-wrap gap-2">
            {TAGS_TYPE1.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedStoreName(selectedStoreName === tag ? "" : tag)}
                className={`px-3 py-1 rounded-full text-xs border-2 ${
                  selectedStoreName === tag
                    ? "bg-orange-300 border-orange-400"
                    : "bg-orange-100 border-orange-200 hover:bg-orange-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 場所タグ */}
           <div className="px-3 py-2 text-sm font-medium flex items-center">
            地域選択
          </div>
          <div className="flex flex-wrap gap-2">
            {TAGS_TYPE2.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedPlaceName(selectedPlaceName === tag ? "" : tag)}
                className={`px-3 py-1 rounded-full text-xs border-2 ${
                  selectedPlaceName === tag
                    ? "bg-orange-300 border-orange-400"
                    : "bg-orange-100 border-orange-200 hover:bg-orange-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* コメント */}
        <div className="space-y-2">
          <div className="px-3 py-2 text-sm font-medium">
            コメント
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-400 resize-none"
            placeholder=""
          />
        </div>

        {/* 投稿ボタン */}
        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-400 text-black py-3 px-4 rounded font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "投稿中..." : "投稿"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;