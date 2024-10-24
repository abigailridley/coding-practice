import axios from "axios";
import React, { useEffect, useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    const response = await axios.get("http://localhost:5001/api/comments");
    setComments(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment) {
      await axios.post("http://localhost:5001/api/comments", {
        content: comment,
      });
      setComment("");
      fetchComments(); //refreshes page after posting
    }
  };
  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write here..."
          required
        />
        <button type="submit">Ok</button>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
