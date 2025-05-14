import React, { useState, useEffect } from "react";

export default function PostsByUser() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const userId = data.reduce((acc, item) => {
          (acc[item.userId] ||= []).push(item);
          return acc;
        }, {});
        setData(userId);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {Object.entries(data).map(([userId, posts]) => (
        <section key={userId} style={{ marginBottom: 40 }}>
          <h2>User {userId}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
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
                <div>
                  {" "}
                  <strong> Id</strong> : {id}
                </div>
                <div>
                  <strong> Title</strong> : {title}
                </div>
                <strong> Body</strong> : {body}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
