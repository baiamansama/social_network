import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post'
import logo from './logo.png'
import { Button } from '@mui/material';

const BASE_URL = 'http://localhost:8000/'

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn, SetOpenSignIn] = useState(false)
  const [openSignUp, SetOpenSignUp] = useState(false)

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
    <div className='app'>
      <div className='app_header'>
        <img className='app_headerImage'
          src={logo}
          alt="social network" />
          <div>
            <Button onClick={() => SetOpenSignIn(true)}>Login</Button>
            <Button onClick={() => SetOpenSignUp(true)}>Signup</Button>
          </div>
      </div>
      <div className='app_posts'>
        {posts.map(post => (
          <Post
            key = {post.id}
            post = { post }    
          />
        ))}
      </div>
    </div>
  );
}

export default App;
