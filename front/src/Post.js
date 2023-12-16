import React, { useEffect, useState } from 'react'
import './Post.css'
import { Avatar, Button } from "@material-ui/core"

const BASE_URL = 'http://localhost:8000/'

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  useEffect(() => {
    const updateImageUrl = () => {
      if (post.image_url_type === 'absolute') {
        setImageUrl(post.image_url);
      } else {
        setImageUrl(BASE_URL + post.image_url);
      }
    };

    updateImageUrl();
  }, [post]);

  return (
    <div className='post'>
      <div className='post_header'>
        <Avatar
          alt='Catalin'
          src=""
        />
        <div className='post_headerInfo'>
          <h3>{post.user.username}</h3>
          <Button className='post_delete' variant="outlined">Delete</Button>
        </div>
      </div>
      <img
        className='post_image'
        src={imageUrl}
        alt={`Post - ${post.id}`}
      />
      <h4 className='post_text'>{post.caption}</h4>
      <div className='post_comments'>
        {comments.map((comment) => (
          <p key={`${comment.id}-${comment.username}`}>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Post
