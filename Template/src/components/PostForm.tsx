import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"

// タグ項目
const TAGS_TYPE1 = [
  "タグ1-1", "タグ1-2", "タグ1-3", "タグ1-4",
  "タグ1-5", "タグ1-6", "タグ1-7", "タグ1-8"
];
const TAGS_TYPE2 = [
  "タグ2-1", "タグ2-2", "タグ2-3", "タグ2-4",
  "タグ2-5", "タグ2-6", "タグ2-7", "タグ2-8"
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags1, setSelectedTags1] = useState<string[]>([]);
  const [selectedTags2, setSelectedTags2] = useState<string[]>([]);

  // タグ選択トグル
  const toggleTag = (type: 1 | 2, tag: string) => {
    if (type === 1) {
      setSelectedTags1(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    } else {
      setSelectedTags2(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("タイトルと内容は必須です。");
      return;
    }
    if (selectedTags1.length === 0 || selectedTags2.length === 0) {
      alert("両方のタグを最低1つずつ選択してください。");
      return;
    }

    let imageUrl = "";
    if (image) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`public/${image.name}`, image);

      if (error) {
        alert("画像のアップロードに失敗しました。");
        return;
      }
      imageUrl = data?.path ?? "";
    }

    // 投稿作成
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert([{
        title,
        content,
        imageUrl,
        tagsType1: selectedTags1,
        tagsType2: selectedTags2
      }])
      .select(); // 投稿ID取得のためselect

    if (postError || !postData || postData.length === 0) {
      alert("投稿の作成に失敗しました。");
    } else {
      // 投稿ID取得
      const postId = postData[0].id;

      // タグ保存（tagsテーブルにinsert）
      // tagsType1
      for (const tag of selectedTags1) {
        await supabase.from("tags").insert([
          { post_id: postId, type: 1, tag }
        ]);
      }
      // tagsType2
      for (const tag of selectedTags2) {
        await supabase.from("tags").insert([
          { post_id: postId, type: 2, tag }
        ]);
      }

      alert("投稿が作成されました。");
      setTitle("");
      setContent("");
      setImage(null);
      setSelectedTags1([]);
      setSelectedTags2([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 画像 */}
      <div>
        <label htmlFor="image">画像:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      {/* 名前（タイトル） */}
      <div>
        <label htmlFor="title">名前:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      {/* コメント */}
      <div>
        <label htmlFor="content">コメント:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      {/* タグ種類1 */}
      <div>
        <label>タグ種類1:</label>
        <div>
          {TAGS_TYPE1.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(1, tag)}
              style={{
                margin: "2px",
                background: selectedTags1.includes(tag) ? "#4caf50" : "#eee"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {/* タグ種類2 */}
      <div>
        <label>タグ種類2:</label>
        <div>
          {TAGS_TYPE2.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(2, tag)}
              style={{
                margin: "2px",
                background: selectedTags2.includes(tag) ? "#2196f3" : "#eee"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <button type="submit">投稿する</button>
    </form>
  );
};

export default PostForm;