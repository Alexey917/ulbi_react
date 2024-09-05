import React, { useState } from "react";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import "./styles/App.css";
import PostList from "./Components/PostList";
import PostForm from "./Components/PostFrom";
import MySelect from "./Components/UI/Selects/MySelect";

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

  // const bodyInputRef = useRef();

  const [selectedSort, setSelectedSort] = useState("");

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // получаем элемент из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    console.log(sort);
  };

  return (
    <div className="App">
      <Counter />
      <ClassCounter />
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ marginBottom: "50px" }}
      />

      <PostForm create={createPost} />

      <div style={{ marginBottom: "35px" }}>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>

      {posts.length !== 0 ? (
        <PostList
          posts={posts}
          title={"Посты по языкам программирования"}
          remove={removePost}
        />
      ) : (
        <h2 style={{ textAlign: "center" }}>Посты не найдены!</h2>
      )}

      <PostList posts={posts2} title={"Посты по фреймворкам"} />
    </div>
  );
}

export default App;
