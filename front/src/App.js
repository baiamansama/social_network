import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post'
const BASE_URL = 'http://localhost:8000/'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_URL + 'post/all');

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        const result = data.sort((a, b) => {
          return b.timestamp.localeCompare(a.timestamp);
        })
        setPosts(result);
      } catch (error) {
        console.error(error);
        alert('Error fetching posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='app_posts'>
      {posts.map(post => (
        <Post
          key = {post.id}
          post = { post }    
        />
      ))}
    </div>
  );
}

export default App;
