import Post from "../post/post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import React from "react";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data),
  });

  const uniquePosts = [];
  const seenPostIds = new Set();

  if (data) {
    data.forEach(post => {
      if (!seenPostIds.has(post.id)) {
        uniquePosts.push(post);
        seenPostIds.add(post.id);
      }
    });
  }

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : uniquePosts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
