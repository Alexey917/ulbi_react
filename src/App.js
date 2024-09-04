import React, { useState } from "react";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import "./styles/App.css";
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/Buttons/MyButton";
import MyInput from "./Components/UI/Inputs/MyInput";

function App() {
  const [value, setValue] = useState("Текст в инпуте");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "Python", body: "Description" },
    { id: 3, title: "C#", body: "Description" },
    { id: 4, title: "C++", body: "Description" },
  ]);

  const [posts2] = useState([
    { id: 1, title: "React", body: "Description" },
    { id: 2, title: "FastAPI", body: "Description" },
    { id: 3, title: "Unreal Engine", body: "Description" },
    { id: 4, title: "Unity", body: "Description" },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const bodyInputRef = useRef();

  function addNewPost(e) {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: title,
      body: body,
    };

    setPosts([...posts, newPost]);
  }

  return (
    <div className="App">
      <Counter />
      <ClassCounter />
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ marginBottom: 50 }}
      />

      <form>
        {/* Управляемый компонент */}
        <MyInput
          type="text"
          value={title}
          placeholder="Название поста"
          onChange={(e) => setTitle(e.target.value)}
        />
        <MyInput
          type="text"
          value={body}
          placeholder="Название поста"
          onChange={(e) => setBody(e.target.value)}
        />
        {/* Неуправляемый компонент */}
        {/* <MyInput type="text" placeholder="Описание поста" ref={bodyInputRef} /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>

      <PostList posts={posts} title={"Посты по языкам программирования"} />
      <PostList posts={posts2} title={"Посты по фреймворкам"} />
    </div>
  );
}

export default App;
