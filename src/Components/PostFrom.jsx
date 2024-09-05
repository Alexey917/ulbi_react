import React, { useState } from "react";
import MyButton from "./UI/Buttons/MyButton";
import MyInput from "./UI/Inputs/MyInput";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  function addNewPost(e) {
    e.preventDefault();

    const newPost = { id: Date.now(), ...post };
    create(newPost);
    setPost({ title: "", body: "" });
  }

  return (
    <div>
      <form>
        {/* Управляемый компонент */}
        <MyInput
          type="text"
          value={post.title}
          placeholder="Название поста"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <MyInput
          type="text"
          value={post.body}
          placeholder="Название поста"
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        {/* Неуправляемый компонент */}
        {/* <MyInput type="text" placeholder="Описание поста" ref={bodyInputRef} /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    </div>
  );
};

export default PostForm;
