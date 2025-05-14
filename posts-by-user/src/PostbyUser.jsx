// src/components/PostsByUser.jsx
import React, { useState, useEffect } from "react";

export default function PostsByUser() {
  const [groupedPosts, setGroupedPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // group by userId
        const byUser = data.reduce((acc, post) => {
          (acc[post.userId] ||= []).push(post);
          return acc;
        }, {});
        setGroupedPosts(byUser);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load posts.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      {Object.entries(groupedPosts).map(([userId, posts]) => (
        <section key={userId} style={{ marginBottom: 40 }}>
          <h2>User {userId}</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {posts.map(({ id, title, body }) => (
              <li
                key={id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <h4 style={{ margin: "0 0 5px" }}>{title}</h4>
                <p style={{ margin: 0, color: "#555" }}>{body}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
