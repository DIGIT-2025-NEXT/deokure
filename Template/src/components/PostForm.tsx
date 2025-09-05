import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("タイトルと内容は必須です。");
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

    const { error: postError } = await supabase
      .from("posts")
      .insert([{ title, content, imageUrl }]);

    if (postError) {
      alert("投稿の作成に失敗しました。");
    } else {
      alert("投稿が作成されました。");
      setTitle("");
      setContent("");
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">画像:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label htmlFor="title">タイトル:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">コメント:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">投稿する</button>
    </form>
  );
};

export default PostForm;