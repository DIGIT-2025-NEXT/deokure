"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// タグ項目
const TAGS_TYPE1 = [
  "カフェ", "レストラン", "居酒屋", "bar",
  "", "い", "う」", "え"
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
      const filePath = `post-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images') // バケット名は適切に変更してください
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      // 公開URLを取得
      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

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
    if (!userId) {
      alert("ユーザー情報が取得できません。再度ログインしてください。");
      setIsLoading(false);
      return;
    }

    let imageUrl: string | null = null;

    // 画像がある場合はアップロード
    if (image) {
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
        image_url: imageUrl,
        user_id: userId,
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

    // 保存できたらトップへ
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="image">
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
          場所
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className="content-label">
          コメント
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          店舗選択
          <select
            id="tag_store"
            name="tag_store"
            value={selectedStoreName}
            onChange={(e) => setSelectedStoreName(e.target.value)}
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
          場所選択
          <select
            id="tag_place"
            name="tag_place"
            value={selectedPlaceName}
            onChange={(e) => setSelectedPlaceName(e.target.value)}
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
      <button className="toukou" type="submit" disabled={isLoading}>
        {isLoading ? "投稿中..." : "投稿"}
      </button>
    </form>
  );
};

export default PostForm;