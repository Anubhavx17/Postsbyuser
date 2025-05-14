import React from "react";
import PostsByUser from "./PostbyUser";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Posts Grouped by User
      </h1>
      <PostsByUser />
    </div>
  );
}

export default App;
