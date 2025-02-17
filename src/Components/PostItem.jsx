import React from "react";
import MyButton from "./UI/Buttons/MyButton";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post-content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <p>{props.post.body}</p>
      </div>
      <div className="post-btn">
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
