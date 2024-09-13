import React, { useState, useEffect } from "react";
import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import "./styles/App.css";
import PostList from "./Components/PostList";
import Loader from "./Components/UI/Loader/Loader";
import PostForm from "./Components/PostFrom";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/Modals/MyModal";
import MyButton from "./Components/UI/Buttons/MyButton";
import getPageCount from "./utils/pages";
import getPagesArray from "./utils/pagesArray";
import Pagination from "./Components/UI/Pagination/Pagination";

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

  // const bodyInputRef = useRef();

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const changePage = (page) => {
    setPage(page);
  };

  console.log(totalPages);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // получаем элемент из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
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

      <button onClick={() => fetchPosts()}>GET POSTS</button>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h2>Произошла ошибка ${postError}</h2>}
      {isPostLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          posts={sortedAndSearchPosts}
          title={"Посты по языкам программирования"}
          remove={removePost}
        />
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
      <PostList posts={posts2} title={"Посты по фреймворкам"} />
    </div>
  );
}

export default App;
