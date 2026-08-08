import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', { title, content, author })
      .then(() => {
        setTitle('');
        setContent('');
        setAuthor('');
        fetchPosts();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => fetchPosts())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
     <h1 className="title" style={{ color: '#6a1616' }}>Blog Posts</h1>

      <div className="navbar">
        {localStorage.getItem('token') ? (
          <span>
            Welcome, {localStorage.getItem('username')}!{' '}
            <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.reload(); }}>
              Logout
            </button>
          </span>
        ) : (
          <span>
            <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Create Post</button>
      </form>

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>by {post.author}</small>
          <button className="delete-btn" onClick={() => handleDelete(post._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;