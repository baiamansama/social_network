import React, { useEffect, useState } from 'react'
import './App.css'
import Post from './Post'
import logo from './logo.png'
import { Button, Modal, makeStyles, Input } from '@material-ui/core'



const BASE_URL = 'http://localhost:8000/'

function getModalStyle(){
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left})`,

  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function App() {

  const classes = useStyles()

  const [posts, setPosts] = useState([]);
  const [openSignIn, SetOpenSignIn] = useState(false)
  const [openSignUp, SetOpenSignUp] = useState(false)
  const [modalStyle, setModalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authToken, setAuthToken] = useState(null)
  const [authTokenType, setAuthTokenType] = useState(null)
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {
    setAuthToken(window.localStorage.getItem('authToken'))
    setAuthTokenType(window.localStorage.getItem('authToken'))
    setUsername(window.localStorage.getItem('username'))
    setUserId(window.localStorage.getItem('userId'))
  }, [])

  useEffect(()=> {
    authToken
      ? window.localStorage.setItem('authToken', authToken)
      : window.localStorage.removeItem('authToken')
    authTokenType
      ? window.localStorage.setItem('authTokenType', authTokenType)
      : window.localStorage.removeItem('authTokenType')
    username
      ? window.localStorage.setItem('username', username)
      : window.localStorage.removeItem('username')
    userId
      ? window.localStorage.setItem('userId', userId)
      : window.localStorage.removeItem('userId')
  },[authToken, authTokenType, userId])


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

  const signIn = (event) => {
    event?.preventDefault()

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + 'login', requestOptions)
      .then(response => {
        if (response.ok){
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data)
        setAuthToken(data.access_token)
        setAuthTokenType(data.token_type)
        setUserId(data.user_id)
        setUsername(data.username)
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
    SetOpenSignIn(false)
  }

  const signOut = (event) => {
    setAuthToken(null)
    setAuthTokenType(null)
    setUserId('')
    setUsername('')
  }

  const signUp = (event) => {
    event?.preventDefault()

    const json_string = JSON.stringify({
      username: username,
      email: email,
      password: password
    })

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: json_string
    }

    fetch(BASE_URL + 'user/', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        // console.log(data)
        signIn()
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
    SetOpenSignUp(false)
  }

  return (
    <div className='app'>
      <Modal
        open={openSignIn}
        onClose={() => SetOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signin'>
            <center>
            <img className='app_headerImage'
              src={logo}
              alt="social network" />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              onClick={signIn}>Login</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignUp}
        onClose={() => SetOpenSignUp(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signin'>
            <center>
            <img className='app_headerImage'
              src={logo}
              alt="social network" />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              onClick={signUp}>Signup
            </Button>
          </form>
        </div>
      </Modal>
      <div className='app_header'>
        <img className='app_headerImage'
          src={logo}
          alt="social network" />
          {authToken ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <div>
                <Button onClick={() => SetOpenSignIn(true)}>Login</Button>
                <Button onClick={() => SetOpenSignUp(true)}>Signup</Button>
              </div>
            )
          }
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
