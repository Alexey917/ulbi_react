import { useMemo } from "react";

export function useSortedPosts(posts, methodOfSort) {
  const sortedPosts = useMemo(() => {
    console.log("Отработала фукция sortPosts");
    if (methodOfSort) {
      return [...posts].sort((a, b) =>
        a[methodOfSort].localeCompare(b[methodOfSort])
      );
    } else {
      return posts;
    }
  }, [methodOfSort, posts]);
  return sortedPosts;
}

export function usePosts(posts, methodOfSort, query) {
  const sortedPosts = useSortedPosts(posts, methodOfSort);
  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchPosts;
}
