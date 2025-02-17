import { useMemo } from "react";

<<<<<<< HEAD
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
=======
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    console.log("Отработала фукция sortPosts");
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    } else {
      return posts;
    }
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
>>>>>>> 7791ac3e224513ebb01cacdd9a12e199574741df
  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchPosts;
<<<<<<< HEAD
}
=======
};
>>>>>>> 7791ac3e224513ebb01cacdd9a12e199574741df
