import React, { useEffect, useState } from 'react';
import './Post.css';

const BASE_URL = 'http://localhost:8000/';

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState('');

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
      <img
        className='post_image'
        src={imageUrl}
        alt={`Post - ${post.id}`}
      />
    </div>
  );
}

export default Post;
