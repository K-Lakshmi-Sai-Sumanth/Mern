import { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}?page=1&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPosts(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch posts");
    }
  };

  const loadMore = async () => {
    try {
      const nextPage = page + 1;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}?page=${nextPage}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPosts([...posts, ...res.data]);
      setPage(nextPage);
    } catch (err) {
      toast.error("Failed to load more posts");
    }
  };

  const createPost = async () => {
    if (!title || !body) {
      toast.error("Title and body are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPosts([res.data, ...posts]);
      setTitle("");
      setBody("");

      toast.success("Post created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post");
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((p) => p._id !== id));

      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete post");
    }
  };

  const editPost = async (post) => {
    const newTitle = prompt("Edit title", post.title);
    const newBody = prompt("Edit body", post.body);

    if (!newTitle || !newBody) {
      toast.error("Title and body cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}/${post._id}`,
        { title: newTitle, body: newBody },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPosts(posts.map((p) => (p._id === post._id ? res.data : p)));

      toast.success("Post updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update post");
    }
  };

  const searchPosts = async (value) => {
    setSearch(value);

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_POSTS_API}?page=1&limit=10&search=${value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setPosts(res.data);
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div className="dashboard">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="header">
        <h2>Posts Dashboard</h2>

        <input
          className="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => searchPosts(e.target.value)}
        />
      </div>

      <div className="create-post">
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button onClick={createPost}>Create Post</button>
      </div>

      <div className="posts-grid">
        {filteredPosts.map((p) => (
          <div className="post-card" key={p._id}>
            <div className="card-header">
              <span className="author">User {p.userId}</span>
            </div>

            <h3>{p.title}</h3>

            <p>{p.body}</p>

            <div className="actions">
              <button onClick={() => editPost(p)}>Edit</button>
              <button onClick={() => deletePost(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-container">
        <button onClick={loadMore} className="load-btn">
          Load More
        </button>
      </div>
    </div>
  );
}
