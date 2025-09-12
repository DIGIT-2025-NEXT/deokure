import React from "react";
import PostForm from "./src/components/PostForm";
import "./src/styles/Template_style.css";

const PostPage = () => {
    return (
        <div>
            <h1>投稿</h1>
            <PostForm />
        </div>
    );
};

export default PostPage;