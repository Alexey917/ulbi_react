import React, { useEffect, useState } from "react";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import "./styles/App.css";
import PostList from "./Components/PostList";
import PostForm from "./Components/PostFrom";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/Modals/MyModal";
import MyButton from "./Components/UI/Buttons/MyButton";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";

function App() {
  const [value, setValue] = useState("Текст в инпуте");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description aaaa" },
    { id: 2, title: "Python", body: "Description cccc" },
    { id: 3, title: "C#", body: "Description yyyy" },
    { id: 4, title: "C++", body: "Description kkkk" },
  ]);

  const [posts2] = useState([
    { id: 1, title: "React", body: "Description" },
    { id: 2, title: "FastAPI", body: "Description" },
    { id: 3, title: "Unreal Engine", body: "Description" },
    { id: 4, title: "Unity", body: "Description" },
  ]);

  useEffect(() => {
    fetchPosts();
  }, [])

  async function fetchPosts() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
  }

  // const bodyInputRef = useRef();

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // получаем элемент из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // const sortPosts = (sort) => {
  //   setSelectedSort(sort);
  // };

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

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <button onClick={fetchPosts}>GET POSTS</button>

      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        posts={sortedAndSearchPosts}
        title={"Посты по языкам программирования"}
        remove={removePost}
      />

      <PostList posts={posts2} title={"Посты по фреймворкам"} />
    </div>
  );
}

export default App;
